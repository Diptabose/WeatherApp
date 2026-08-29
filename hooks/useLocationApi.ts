import { useCallback, useEffect, useState } from "react";
import { getLocation } from "@/lib/location";

export function useLocationApi() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [geoLocationPosition, setGeoLocationPosition] =
    useState<GeolocationPosition | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [geoLocationError, setGeoLocationError] =
    useState<GeolocationPositionError | null>(null);

  const getGeoLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      const geolocation = await getLocation();
      setIsSuccess(true);
      setGeoLocationPosition(geolocation);
    } catch (err) {
      setIsError(true);
      setGeoLocationError(err as GeolocationPositionError);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getGeoLocation();
  }, []);

  return {
    isLoading: isLoading,
    isError,
    isSuccess,
    error: geoLocationError,
    position: geoLocationPosition,
    getPosition: getGeoLocation,
  };
}
