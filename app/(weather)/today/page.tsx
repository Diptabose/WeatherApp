import { WeatherAqi } from "@/components/weather/aqi/WeatherAqi";
import WeatherDetails from "@/components/weather/details/WeatherDetails";
import { WeatherSunAnimation } from "@/components/weather/details/WeatherSunAnimation";
import { WeatherOneCall } from "@/components/weather/hourly/WeatherOneCall";
import { WeatherReport } from "@/components/weather/today/WeatherReport";
import { weatherClient } from "@/services/weather.server-client";
import { WeatherData } from "@/types/weather.types";
import { Suspense } from "react";

const TodayPage = async ({ searchParams }: PageProps<"/today">) => {
  const { lat, lon } = await searchParams;

  if (!lat || !lon) {
    return <></>;
  }

  const weatherResponse = await weatherClient.get<WeatherData>(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`,
  );
  const data = weatherResponse.data;

  return (
    <>
      <WeatherReport weatherData={data} place={data.name} />
      <Suspense fallback={<>One call loading...</>}>
        <WeatherOneCall lat={lat as string} lon={lon as string} />
      </Suspense>
      <WeatherDetails weatherData={data} today={true} />
      <WeatherSunAnimation sys={data.sys} today={true} />
      <Suspense fallback={<>Doing some loading...</>}>
        <WeatherAqi lat={lat as string} lon={lon as string} />
      </Suspense>
    </>
  );
};
export default TodayPage;
