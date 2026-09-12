import { setHour } from "@/lib/utils";
import { WeatherReport } from "@/types/weather.types";
import Image from "next/image";
import { WeatherSectionTitle } from "../WeatherSection";

interface WeatherHourltSetterProps {
  time: number;
  icon: string;
  temp: number;
}

interface WeatherHourlyProps {
  hourly: {
    dt: number;
    temp: number;
    weather: WeatherReport[];
  }[];
}

function WeatherHourlySetter({ icon, temp, time }: WeatherHourltSetterProps) {
  const data = (
    <div className="flex flex-col items-center p-2 rounded bg-sky-900 text-sm">
      <span id="hourtime" className="text-white">
        {setHour(time)}
      </span>
      <Image
        className="w-10 h-10"
        src={`/icons/${icon}.svg`}
        alt="Hour"
        preload={true}
        width={60}
        height={60}
      />
      <span id="temp" className="text-white">
        {Math.ceil(temp)}°C
      </span>
    </div>
  );
  return data;
}

function WeatherHourly({ hourly }: WeatherHourlyProps) {
  const weatherhourly = (
    <div>
      <WeatherSectionTitle name="Hourly" />
      <div className="flex gap-2  justify-center-safe py-2 overflow-y-scroll scrollbar-none">
        {hourly.map((element) => {
          const { dt, temp, weather } = element;
          return (
            <WeatherHourlySetter
              key={dt}
              time={dt}
              temp={temp}
              icon={weather[0].icon}
            />
          );
        })}
      </div>
    </div>
  );
  return weatherhourly;
}
export default WeatherHourly;
