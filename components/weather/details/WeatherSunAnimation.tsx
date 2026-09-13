"use client";
import { WeatherSys } from "@/types/weather.types";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import { sunSetter, sumTotal } from "@/lib/weather";
import { WeatherSectionTitle } from "../WeatherSection";

interface WeatherSunAnimationProps {
  today: boolean;
  sys: WeatherSys;
}

function clampDegree(degree: number) {
  return Math.min(180, Math.max(0, degree));
}

function calcSunDegree(sys: WeatherSys, today: boolean, now: number) {
  if (!today) {
    // No "current time" for a future day, so show the sun at rest on the horizon.
    return 0;
  }
  const progress = now - sys.sunrise * 1000;
  const total = (sys.sunset - sys.sunrise) * 1000;
  return clampDegree(Math.ceil((progress / total) * 180));
}

export function WeatherSunAnimation({ sys, today }: WeatherSunAnimationProps) {
  // Date.now() must not run during SSR, or hydration can mismatch the server's render time.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
  }, []);

  // Detecting "scrolled into view" has no CSS-only equivalent with reliable
  // cross-browser support yet, so this is the one bit of JS the animation needs.
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = progressRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const degree = useMemo(
    () => (now === null ? null : calcSunDegree(sys, today, now)),
    [now, sys, today],
  );

  const arcVars =
    degree === null
      ? undefined
      : ({
          "--sun-degree": `${degree}deg`,
          "--rotor-degree": `${135 + degree}deg`,
        } as CSSProperties);

  const shouldAnimate = degree !== null && inView;

  return (
    <>
      <WeatherSectionTitle name="Sunrise/Sunset" />

      <div className="flex flex-col items-center justify-center w-full my-4 px-5">
        <div className="flex flex-col items-center w-full max-w-64">
          <div
            id="progress"
            ref={progressRef}
            style={arcVars}
            className="relative flex items-end w-full aspect-2/1 border-b-4 border-gray-700"
          >
            {/* Clips the arc only, so the sun icon is free to overshoot the box at its peak. */}
            <div
              aria-hidden="true"
              className={[
                "arc absolute inset-0 overflow-hidden",
                "after:absolute after:top-0 after:left-0 after:w-full after:aspect-square",
                "after:border-10",
                "after:border-t-orange-500 after:border-r-orange-500 after:border-b-gray-400 after:border-l-gray-400",
                "after:block after:rounded-full",
                shouldAnimate ? "arc-animate" : "",
              ].join(" ")}
            />
            <div
              id="sunImg"
              className={[
                "flex-1 block z-2",
                shouldAnimate ? "sun-animate" : "",
              ].join(" ")}
            >
              <Image
                className="w-10 h-10 -translate-x-3.25 translate-y-1/2"
                src="/icons/01d.svg"
                preload={true}
                alt="Sun"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="flex justify-between self-stretch">
            <div className="-translate-x-5/12 flex flex-col self-start items-center">
              <Image
                className="w-10 h-10"
                alt="sunrise"
                src="/icons/sunrise.svg"
                preload={true}
                width={40}
                height={40}
              />
              <span className="text-sm">{sunSetter(sys.sunrise * 1000)}</span>
            </div>
            <div className="translate-x-5/12 flex flex-col self-start items-center">
              <Image
                className="w-10 h-10"
                alt="sunset"
                src="/icons/sunset.svg"
                width={40}
                height={40}
                preload={true}
              />
              <span className="text-sm">{sunSetter(sys.sunset * 1000)}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm w-full min-w-0">
            <div className="flex flex-col shrink-0">
              <span>Total Time:</span>
              <span>Time Left:</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate">
                {sumTotal(sys.sunset - sys.sunrise)}
              </span>
              <span className="truncate">
                {sumTotal(sys.sunset - Math.floor(new Date().getTime() / 1000))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
