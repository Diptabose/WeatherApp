"use client";

import { WeatherRouteError } from "@/components/weather/WeatherRouteError";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <WeatherRouteError
      error={error}
      retry={retry}
      description="We couldn't load the 5 day forecast. Please try again."
    />
  );
}
