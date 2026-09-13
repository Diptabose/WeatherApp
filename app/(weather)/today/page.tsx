import { WeatherAqi } from "@/components/weather/aqi/WeatherAqi";
import { WeatherAqiSkeleton } from "@/components/weather/aqi/WeatherAqiSkeleton";
import WeatherDetails from "@/components/weather/details/WeatherDetails";
import { WeatherSunAnimation } from "@/components/weather/details/WeatherSunAnimation";
import { WeatherHourlySkeleton } from "@/components/weather/hourly/WeatherHourlySkeleton";
import { WeatherOneCall } from "@/components/weather/hourly/WeatherOneCall";
import { WeatherReport } from "@/components/weather/today/WeatherReport";
import { WeatherSectionErrorBoundary } from "@/components/weather/WeatherSectionError";
import { normalizePlaceName } from "@/lib/weather";
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
      <WeatherReport weatherData={data} place={normalizePlaceName(data.name)} />
      <WeatherSectionErrorBoundary title="the hourly forecast">
        <Suspense fallback={<WeatherHourlySkeleton />}>
          <WeatherOneCall lat={lat as string} lon={lon as string} />
        </Suspense>
      </WeatherSectionErrorBoundary>
      <WeatherDetails weatherData={data} today={true} />
      <WeatherSunAnimation sys={data.sys} today={true} />
      <WeatherSectionErrorBoundary title="the air quality index">
        <Suspense fallback={<WeatherAqiSkeleton />}>
          <WeatherAqi lat={lat as string} lon={lon as string} />
        </Suspense>
      </WeatherSectionErrorBoundary>
    </>
  );
};
export default TodayPage;
