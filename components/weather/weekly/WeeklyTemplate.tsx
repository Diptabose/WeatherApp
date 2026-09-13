import { capitalise } from "@/lib/utils";
import Image from "next/image";
import {
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { sunSetter, todayOrNot } from "@/lib/weather";

export interface WeeklyOuterProps {
  day: number;
  description: string;
  icon: string;
  max: number;
  min: number;
}

export interface WeeklyInnerProps {
  sunrise: number;
  sunset: number;
  humidity: number;
  pressure: number;
  windspeed: number;
  winddegree: number;
  clouds: number;
}

interface WeeklyTemlateProps {
  outer: WeeklyOuterProps;
  inner: WeeklyInnerProps;
}

function AccordionInner({
  sunrise,
  sunset,
  humidity,
  pressure,
  winddegree,
  windspeed,
  clouds,
}: WeeklyInnerProps) {
  return (
    <div className="px-2 flex py-3 w-full" id="details">
      <div className={`flex border-r-2 w-1/2 md:items-center`}>
        <div className="flex flex-col w-full">
          <div className="flex justify-between ">
            <p className="truncate flex-1">Sunrise</p>
            <p className="truncate flex-1">{sunSetter(sunrise)}</p>
          </div>

          <div className="flex justify-between md:justify-evenly">
            <p className="py-1 truncate flex-1">Sunset</p>
            <p className="py-1 truncate flex-1">{sunSetter(sunset)}</p>
          </div>

          <div className="flex justify-between md:justify-evenly">
            <p className="truncate flex-1">Humidity</p>
            <p className="truncate flex-1">{humidity}%</p>
          </div>

          <div className="flex justify-between md:justify-evenly">
            <p className="py-1 truncate flex-1">Pressure</p>
            <p className="py-1 truncate flex-1">{pressure} hPa</p>
          </div>
        </div>
      </div>
      <div className="flex ml-3 w-1/2">
        <div className="flex flex-col w-full">
          <div className="flex justify-between md:justify-evenly">
            <p className="truncate flex-1">Windspeed</p>
            <p className="truncate flex-1">{Math.floor(windspeed)} m/s</p>
          </div>

          <div className="flex justify-between md:justify-evenly">
            <p className="py-1 truncate flex-1">WindDegree</p>
            <p className="py-1 truncate flex-1">{winddegree}°</p>
          </div>

          <div className="flex justify-between md:justify-evenly">
            <p className="truncate flex-1">Clouds</p>
            <p className="truncate flex-1">{clouds}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccordionOuter({
  day,
  description,
  icon,
  max,
  min,
}: WeeklyOuterProps) {
  return (
    <div
      id="maincard"
      className="px-2 flex justify-between items-center sm:justify-between md:justify-between w-full"
    >
      <div id="day&weather" className="wrap-break-word">
        <p className="m-0 truncate">{todayOrNot(day)}</p>
        <p className="m-0 truncate">{capitalise(description)}</p>
      </div>
      <div className="flex items-center">
        <Image
          className="w-10 h-10"
          width={56}
          height={56}
          src={`/icons/${icon}.svg`}
          preload={true}
          alt="morning"
        />
        <div id="maxmin" className="flex flex-col ">
          <p className="font-medium">{max}</p>
          <p>{min}</p>
        </div>
      </div>
    </div>
  );
}

export function WeeklyTemplate({ outer, inner }: WeeklyTemlateProps) {
  return (
    <AccordionItem value={todayOrNot(outer.day)} className="border-none">
      <AccordionTrigger showTrigger={false} className="bg-surface">
        <AccordionOuter {...outer} />
      </AccordionTrigger>
      <AccordionContent>
        <AccordionInner {...inner} />
      </AccordionContent>
    </AccordionItem>
  );
}
