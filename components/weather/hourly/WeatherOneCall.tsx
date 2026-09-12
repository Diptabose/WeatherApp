import { weatherClient } from "@/services/weather.server-client";
import { ForecastData } from "@/types/forecast.types";
import WeatherHourly from "./WeatherHourly";
import WeatherPlot from "./WeatherPlot";
import { adaptForecast } from "@/lib/weather";

interface WeatherOneCallProps {
  lat: string;
  lon: string;
}

export async function WeatherOneCall({ lat, lon }: WeatherOneCallProps) {
  const foreCastResponse = await weatherClient.get<ForecastData>(
    `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`,
  );
  const data = adaptForecast(foreCastResponse.data);
  return (
    <>
      <WeatherHourly hourly={data.hourly} />
      <WeatherPlot hourly={data.hourly} />
    </>
  );
}
