import { capitalise } from "@/lib/utils";
import { greeter } from "@/lib/weather";
import { WeatherData } from "@/types/weather.types";
import Image from "next/image";

interface WeatherReportProps {
  place: string;
  weatherData: WeatherData;
}

export function WeatherReport({ weatherData, place }: WeatherReportProps) {
  const { weather, main, clouds, wind, dt } = weatherData;

  const weatherreport = (
    <div className="flex flex-col min-w-0 justify-center gap-0.5">
      <div className="text-sm text-muted-foreground">{greeter()}</div>
      <div id="loactionName" className="min-w-0 truncate text-2xl font-bold">
        {place}
      </div>
      <div className="text-sm text-muted-foreground">
        {new Date(dt * 1000).toDateString()}
      </div>
      <div id="weatherimg and temp" className="flex flex-col">
        <div id="blur" className="relative flex justify-center">
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <div className="blur-[50px] w-20 h-20 rounded-full bg-yellow-400"></div>
            <div className="blur-[50px] w-20 h-20 rounded-full bg-sky-400"></div>
          </div>
          <Image
            className="z-1 text-center w-32 h-32"
            src={`/icons/${weather[0].icon}.svg`}
            alt="Main Weather"
            preload={true}
            width={128}
            height={128}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-center">
            {capitalise(weather[0].description)}
          </span>
          <h1 className="temperature my-2 text-6xl sm:text-8xl font-bold">
            {Math.ceil(main.temp)}
            <sup className="text-sky-500">°</sup>
          </h1>
        </div>
      </div>
      <div
        id="3cards"
        className="flex justify-evenly gap-2 my-2 text-sm sm:text-base md:w-1/2 lg:w-1/2 md:m-auto md:justify-between lg:m-auto lg:justify-between"
      >
        <div className="flex flex-col items-center min-w-0">
          <Image
            className="w-10 h-10 sm:w-14 sm:h-14"
            src="/icons/03d.svg"
            alt="Clouds"
            width={56}
            height={56}
            preload={true}
          />
          <span className="w-full text-center wrap-break-word">
            {clouds.all}%
          </span>
          <span className="w-full text-center wrap-break-word">Clouds</span>
        </div>
        <div className="flex flex-col items-center min-w-0">
          <Image
            className="w-10 h-10 sm:w-14 sm:h-14"
            src="/icons/humidity.svg"
            alt="Humidity"
            width={56}
            height={56}
            preload={true}
          />
          <span className="w-full text-center wrap-break-word">
            {main.humidity}%
          </span>
          <span className="w-full text-center wrap-break-word">Humidity</span>
        </div>
        <div className="flex flex-col items-center min-w-0">
          <Image
            className="w-10 h-10 sm:w-14 sm:h-14"
            src="/icons/wind.svg"
            alt="Wind"
            width={56}
            height={56}
            preload={true}
          />
          <span className="w-full text-center wrap-break-word">
            {wind.speed}m/s
          </span>
          <span className="w-full text-center wrap-break-word">Wind</span>
        </div>
      </div>
    </div>
  );
  return weatherreport;
}
