"use client";
import { useLocation } from "@/providers/LocationProvider";
import { WeatherError } from "../WeatherError";
import { ReactNode } from "react";

export function WeatherCompoundError({ children }: { children: ReactNode }) {
  const { error, isError } = useLocation();
  return (
    <WeatherError error={error} isError={isError}>
      {children}
    </WeatherError>
  );
}
