import {
  weatherClient,
  withCoordinates,
  withError,
} from "@/services/weather.server-client";
import { ForecastData } from "@/types/forecast.types";
import { NextRequest, NextResponse } from "next/server";

async function forecast(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const foreCastData = await weatherClient.get<ForecastData>(
    `/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric`,
  );
  return NextResponse.json(foreCastData.data);
}

export const GET = withError(withCoordinates(forecast));

// https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=3&appid=66d9420ba608bc0e68e2a6dffe8361ab