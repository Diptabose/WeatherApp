import { useCallback, useMemo, useState } from "react";
import { useLocationApi } from "./useLocationApi";

interface OverrideCoordinates {
  lat: number;
  lon: number;
}

export function useLocationManagement() {
  const { position, isLoading, isError, isSuccess, error, getPosition } =
    useLocationApi();

  const [isLocationOverride, setIsLocationOverride] = useState(true);
  const [locationOverrides, setLocationOverrides] =
    useState<OverrideCoordinates | null>(null);

  const setOverride = useCallback((location: OverrideCoordinates) => {
    setIsLocationOverride(true);
    setLocationOverrides(location);
  }, []);

  const refetch = useCallback(() => {
    getPosition();
    setLocationOverrides(null);
    setIsLocationOverride(false);
  }, []);

  const geoPosition = useMemo(() => {
    const pos = {
      lat: locationOverrides?.lat ?? position?.coords?.latitude,
      lon: locationOverrides?.lon ?? position?.coords?.longitude,
    };
    return pos;
  }, [position, locationOverrides]);

  return {
    isLoading,
    isLocationOverride,
    isError,
    isSuccess,
    error,
    geoPosition,
    setOverride,
    refetch,
  };
}
