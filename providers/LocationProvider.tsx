"use client";
import { useCoordinates } from "@/hooks/useCoordinates";
import { useLocationManagement } from "@/hooks/useLocationManagement";
import { GeoPosition } from "@/types/location.types";
import { createContext, PropsWithChildren } from "react";

export const LocationContext = createContext<ReturnType<typeof useLocationManagement>>({
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  setOverride: () => { },
  geoPosition: { lat: 0, lon: 0 },
  isLocationOverride: false,
  refetch: () => { }
});

export function LocationProvider({ children }: PropsWithChildren) {
  const data = useLocationManagement();
  useCoordinates(data?.geoPosition as GeoPosition);
  return <LocationContext value={data}>{children}</LocationContext>;
}
