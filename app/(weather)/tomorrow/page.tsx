import WeatherDetails from "@/components/weather/details/WeatherDetails";
import { WeatherReport } from "@/components/weather/today/WeatherReport";
import { weatherClient } from "@/services/weather.server-client";
import { WeatherData } from "@/types/weather.types";
import { ForecastData } from "@/types/forecast.types";
import { adaptForecast, adaptTomorrow } from "@/lib/weather";
import WeatherPlot from "@/components/weather/hourly/WeatherPlot";
import WeatherHourly from "@/components/weather/hourly/WeatherHourly";

const TomorrowPage = async ({ searchParams }: PageProps<"/today">) => {
  const { lat, lon } = await searchParams;

  if (!lat || !lon) {
    return <></>;
  }

  const weatherResponse = await weatherClient.get<WeatherData>(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`,
  );

  const { name } = weatherResponse.data;
  const forecastResponse = await weatherClient.get<ForecastData>(
    `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`,
  );
  const data = adaptForecast(forecastResponse.data);
  const { weatherData, hourlyData } = adaptTomorrow(data);

  return <>
    <WeatherReport today={false} weatherData={weatherData as WeatherData} place={name} />
    <WeatherHourly hourly={hourlyData} />
    <WeatherPlot hourly={hourlyData} />
    <WeatherDetails today={false} weatherData={weatherData as WeatherData} />
  </>;
};
export default TomorrowPage;