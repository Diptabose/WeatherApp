import { PropsWithChildren } from "react";

interface WeatherErrorProps extends PropsWithChildren {
  isError: boolean;
  error: GeolocationPositionError | null;
}

export function WeatherError({ isError, error, children }: WeatherErrorProps) {
  if (isError) {
    return <>Error</>;
  }
  return children;
}
