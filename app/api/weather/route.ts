import {
  weatherClient,
  withCoordinates,
  withError,
} from "@/services/weather.server-client";
import { WeatherData } from "@/types/weather.types";
import { NextRequest, NextResponse } from "next/server";

async function weather(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const weatherData = await weatherClient.get<WeatherData>(
    `/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`,
  );
  return NextResponse.json(weatherData.data);
}

export const GET = withError(withCoordinates(weather));
