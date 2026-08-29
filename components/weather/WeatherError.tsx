import { PropsWithChildren } from "react";
import { MapPinOff, MapPinXInside, MapPinX } from "lucide-react";
import { Button } from "../ui/button";
import { useLocation } from "@/hooks/useLocation";
import { DefaultMap } from "@/lib/utils";

interface WeatherErrorProps extends PropsWithChildren {
  isError: boolean;
  error: GeolocationPositionError | null;
}

const geoErrorMap = new DefaultMap([
  [1, MapPinOff],
  [2, MapPinXInside],
  [3, MapPinX]
]);

const geoErrorMessageMap = new DefaultMap([
  [1, "Access to Location was denied."],
  [2, "Couldn't get your location."],
  [3, "Access to location timed out."]
]);

export function WeatherError({ isError, error, children }: WeatherErrorProps) {
  const { refetch } = useLocation();

  if (isError) {
    const Icon = geoErrorMap.getOrDefault(error?.code!, MapPinX);
    const message = geoErrorMessageMap.getOrDefault(error?.code!, "Access denied.");
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2">
          <Icon className="size-16" />
          <span>{message}</span>
        </div>
        <Button onClick={refetch}>Retry</Button>
      </div>
    )
  }
  return children;
}
