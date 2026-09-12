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
    <div className="flex flex-col justify-center">
      <div>{greeter()}</div>
      <div id="loactionName" className="text-2xl font-bold 2xm:text-xl">
        {place}
      </div>
      <div>{new Date(dt * 1000).toDateString()}</div>
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
          <h1 className="temperature my-2 ml-6 text-8xl font-bold 2xm:text-7xl">
            {Math.ceil(main.temp)}
            <sup className="text-sky-500">°</sup>
          </h1>
        </div>
      </div>
      <div
        id="3cards"
        className="flex justify-evenly my-2 md:w-1/2 lg:w-1/2 md:m-auto md:justify-between lg:m-auto lg:justify-between 2xm:text-xs "
      >
        <div className="flex flex-col items-center">
          <Image
            className="w-14 h-14"
            src="/icons/03d.svg"
            alt="Clouds"
            width={56}
            height={56}
            preload={true}
          />
          <span className="">{clouds.all}%</span>
          <span>Clouds</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            className="w-14 h-14"
            src="/icons/humidity.svg"
            alt="Humidity"
            width={56}
            height={56}
            preload={true}
          />
          <span>{main.humidity}%</span>
          <span>Humidity</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            className="w-14 h-14"
            src="/icons/wind.svg"
            alt="Wind"
            width={56}
            height={56}
            preload={true}
          />
          <span>{wind.speed}m/s</span>
          <span>Wind</span>
        </div>
      </div>
    </div>
  );
  return weatherreport;
}
