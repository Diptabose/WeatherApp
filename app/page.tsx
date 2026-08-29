"use client";
import { WeatherError } from "@/components/weather/WeatherError";
import { WeatherLoading } from "@/components/weather/WeatherLoading";
import { useLocation } from "@/hooks/useLocation";

export default function Home() {
  const { isLoading, isError, position, error } = useLocation();
  return (
    <WeatherLoading isLoading={isLoading}>
      <WeatherError error={error as GeolocationPositionError} isError={isError}>
        <div className="">Weather is here now.</div>
      </WeatherError>
    </WeatherLoading>
  );
}
