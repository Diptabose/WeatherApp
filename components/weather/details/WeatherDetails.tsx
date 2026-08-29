import { WeatherData } from "@/types/weather.types";
import { WeatherParams } from "./WeatherParams";
import { WeatherSunAnimation } from "./WeatherSunAnimation";

interface WeatherDetailsProps {
  today: boolean,
  weatherData: WeatherData,
  uvi?: unknown
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
    <div className="my-1">
      <p className="text-xl font-bold">Details</p>
      <div className="border-t-2 pt-2  py-4 w-full">
        <div
          className="rounded-lg py-2 my-2 min-w-fit flex sm:w-8/12 md:w-8/12 sm:m-auto md:m-auto lg:w-8/12 lg:m-auto xxs:m-auto lg:my-2 2xm:flex-col 2xm:min-w-full  xxs:w-8/12  xs:min-w-ful"
        >
          <div
            id="left"
            className=" w-1/2 flex flex-col items-center border-r-2  2xm:w-full 2xm:border-r-0"
          >
            <div className=" flex flex-col md:w-8/12 lg:w-8/12 xs:w-full 2xm:w-full  2xm:items-center ">
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
          <div
            id="right"
            className="w-1/2 flex flex-col items-center 2xm:w-full "
          >
            <div className="flex flex-col md:w-8/12 lg:w-8/12 xs:w-full 2xm:w-full 2xm:items-center">
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

      <WeatherSunAnimation sys={sys} today={today} />
    </div >
  );
  return weatherdetails;
}
export default WeatherDetails;
