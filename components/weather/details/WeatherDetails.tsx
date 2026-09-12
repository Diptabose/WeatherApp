import { WeatherData } from "@/types/weather.types";
import { WeatherParams } from "./WeatherParams";
import { WeatherSunAnimation } from "./WeatherSunAnimation";
import { WeatherSectionTitle } from "../WeatherSection";

interface WeatherDetailsProps {
  today: boolean;
  weatherData: WeatherData;
  uvi?: unknown;
}

function WeatherDetails({ weatherData, today, uvi }: WeatherDetailsProps) {
  const { wind, clouds, sys } = weatherData;
  const { temp_min, temp_max, pressure, humidity } = weatherData.main;
  const detailsLeft = {
    Min: Math.floor(temp_min),
    Max: Math.ceil(temp_max),
    Pressure: pressure,
    Humidity: humidity,
  };
  const detailsRight = {
    Speed: wind.speed,
    WindDeg: wind.deg,
    Clouds: clouds.all,
    // Explictly assigned 0, since UVI is omitted from Open Weather Map free tier.
    UVI: 0,
  };

  const weatherdetails = (
    <>
      <WeatherSectionTitle name="Details" />
      <div className="py-4 w-full">
        <div className="rounded-lg py-2 my-2 flex">
          <div id="left-details" className="w-1/2 flex flex-col items-center">
            <div className="w-full flex flex-col gap-1">
              {Object.entries(detailsLeft).map((element) => {
                return (
                  <WeatherParams
                    key={element[0]}
                    param={element[0]}
                    paramValue={element[1]}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-px bg-slate-500"></div>
          <div id="right-details" className="w-1/2 flex flex-col items-center">
            <div className="flex flex-col w-full gap-2">
              {Object.entries(detailsRight).map((element) => {
                return (
                  <WeatherParams
                    key={element[0]}
                    param={element[0]}
                    paramValue={element[1]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return weatherdetails;
}
export default WeatherDetails;
