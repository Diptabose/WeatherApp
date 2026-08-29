"use client";
import { useCoordinates } from "@/hooks/useCoordinates";
import { useLocationApi } from "@/hooks/useLocationApi";
import { createContext, PropsWithChildren, useContext } from "react";

const LocationContext = createContext<ReturnType<typeof useLocationApi>>({
  error: null,
  isError: false,
  isSuccess: false,
  isLoading: true,
  position: null,
  getPosition: async () => { },
});

export function LocationProvider({ children }: PropsWithChildren) {
  const data = useLocationApi();
  useCoordinates(data?.position);
  return <LocationContext value={data}>{children}</LocationContext>;
}

export const useLocation = () => useContext(LocationContext);
