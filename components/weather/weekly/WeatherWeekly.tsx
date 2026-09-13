import { Accordion } from "@/components/ui/accordion";
import { WeeklyTemplate } from "./WeeklyTemplate";
import { AdaptForecast } from "@/types/forecast.types";

interface WeatherWeeklyProps {
  weekly: AdaptForecast["daily"];
}

export function WeatherWeekly({ weekly }: WeatherWeeklyProps) {
  const sevenday = (
    <div className="flex flex-col pb-2">
      <Accordion defaultValue={["Today"]} multiple className="gap-2">
        {weekly.map((element) => {
          const {
            dt,
            sunrise,
            sunset,
            temp,
            humidity,
            pressure,
            wind_speed,
            wind_deg,
            clouds,
            weather,
          } = element;
          const outerDetails = {
            day: dt,
            description: weather[0].description,
            icon: weather[0].icon,
            max: Math.ceil(temp.max),
            min: Math.ceil(temp.min),
          };
          const innerDetails = {
            sunrise: sunrise,
            sunset: sunset,
            humidity: humidity,
            pressure: pressure,
            windspeed: wind_speed,
            winddegree: wind_deg,
            clouds: clouds,
          };
          return (
            <WeeklyTemplate
              key={dt}
              inner={innerDetails}
              outer={outerDetails}
            />
          );
        })}
      </Accordion>
    </div>
  );
  return sevenday;
}
