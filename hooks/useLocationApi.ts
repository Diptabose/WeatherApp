import { useCallback, useEffect, useState } from "react";
import { getLocation } from "@/lib/location";

interface GeolocationPositionJSON {
  coords: {
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number;
    longitude: number;
    speed: number | null;
  };
  timestamps: number;
}

export function useLocationApi() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [geoLocationPosition, setGeoLocationPosition] =
    useState<GeolocationPositionJSON | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [geoLocationError, setGeoLocationError] =
    useState<GeolocationPositionError | null>(null);

  const getGeoLocation = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      setGeoLocationError(null);
      const geolocation = await getLocation();
      const geoLocationJson = geolocation.toJSON() as GeolocationPositionJSON;
      geoLocationJson.coords.latitude = Number(
        geoLocationJson.coords.latitude.toFixed(2),
      );
      geoLocationJson.coords.longitude = Number(
        geoLocationJson.coords.longitude.toFixed(2),
      );
      setIsSuccess(true);
      setGeoLocationPosition(geoLocationJson);
    } catch (err) {
      setIsSuccess(false);
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
