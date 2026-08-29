"use client";
import { useLocation } from "@/providers/LocationProvider";
import { ReactNode } from "react";
import { WeatherLoading } from "../WeatherLoading";

export function WeatherCompoundLoading({ children }: { children: ReactNode }) {
  const { isLoading } = useLocation();
  return <WeatherLoading isLoading={isLoading}>{children}</WeatherLoading>;
}
