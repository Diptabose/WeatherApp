import { WeatherWeekly } from "@/components/weather/weekly/WeatherWeekly";
import { adaptForecast } from "@/lib/weather";
import { weatherClient } from "@/services/weather.server-client";
import { ForecastData } from "@/types/forecast.types";

const NextDaysPage = async ({ searchParams }: PageProps<"/weekly">) => {

  const { lat, lon } = await searchParams;
  if (!lat || !lon) {
    return <></>;
  }

  const forecastResponse = await weatherClient.get<ForecastData>(
    `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`,
  );
  const data = adaptForecast(forecastResponse.data);
  return (
    <>
      <WeatherWeekly weekly={data.daily} />
    </>
  )
};
export default NextDaysPage;
