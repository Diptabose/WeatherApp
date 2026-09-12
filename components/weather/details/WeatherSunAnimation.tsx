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

      <div className="flex  flex-col items-center justify-center w-full mt-4 mb-4">
        <div className="flex flex-col items-center 2xm:text-xs">
          <div
            id="progress"
            ref={progressRef}
            style={arcVars}
            className="relative flex items-end w-64 h-32 6xm:w-32 6xm:h-16 5xm:w-52 5xm:h-28 border-b-4 border-gray-700"
          >
            {/* Clips the arc only, so the sun icon is free to overshoot the box at its peak. */}
            <div
              aria-hidden="true"
              className={[
                "arc absolute inset-0 overflow-hidden",
                "after:absolute after:top-0 after:left-0 after:w-64 after:h-64 6xm:after:w-32 6xm:after:h-32 5xm:after:w-52 5xm:after:h-52",
                "after:border-10 6xm:after:border-[6px] 5xm:after:border-[8px]",
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
                className="w-10 h-10 -translate-x-3.75 translate-y-1/2 6xm:w-8 6xm:h-8"
                src="/icons/01d.svg"
                preload={true}
                alt="Sun"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="flex justify-between self-stretch 6xm:w-32 5xm:w-52 5xm:self-center">
            <div className="-translate-x-5/12 flex flex-col self-start  5xm:-translate-x-3.5 6xm:-translate-x-2.5 items-center">
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
            <div className="translate-x-5/12 flex flex-col self-start 5xm:translate-x-3.5 6xm:translate-x-3 items-center">
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
          <div className="flex items-center justify-center text-sm">
            <div className="flex flex-col">
              <span>Total Time:</span>
              <span>Time Left:</span>
            </div>
            <div className="flex flex-col mx-4 ">
              <span>{sumTotal(sys.sunset - sys.sunrise)}</span>
              <span>
                {sumTotal(sys.sunset - Math.floor(new Date().getTime() / 1000))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
