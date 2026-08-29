import { WeatherAqi } from "@/components/weather/aqi/WeatherAq";
import WeatherDetails from "@/components/weather/details/WeatherDetails";
import { WeatherOneCall } from "@/components/weather/hourly/WeatherOneCall";
import { WeatherReport } from "@/components/weather/today/WeatherReport";
import { weatherClient } from "@/services/weather.server-client";
import { WeatherData } from "@/types/weather.types";
import { Suspense } from "react";

const TodayPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams;
  console.log("The search params ", search);
  const weatherResponse = await weatherClient.get<WeatherData>(
    `/data/2.5/weather?lat=${search.lat}&lon=${search.lon}&units=metric`,
  );
  const data = weatherResponse.data;

  return <>
    <WeatherReport today={true} weatherData={data} place={data.name} />
    <Suspense fallback={<>One call loading...</>}>
      <WeatherOneCall lat={search.lat as unknown as number} lon={search.lon as unknown as number} />
    </Suspense>
    <WeatherDetails weatherData={data} today={true} />
    <Suspense fallback={<>Doing some loading...</>}>
      <WeatherAqi lat={search.lat as unknown as number} lon={search.lon as unknown as number} />
    </Suspense>
  </>;
};
export default TodayPage;