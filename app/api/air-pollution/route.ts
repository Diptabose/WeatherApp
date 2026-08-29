import {
  weatherClient,
  withCoordinates,
  withError,
} from "@/services/weather.server-client";
import { AirPollutionData } from "@/types/air-pollution.types";
import { NextRequest, NextResponse } from "next/server";

async function weather(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");
  const airPollutionData = await weatherClient.get<AirPollutionData>(
    `/data/2.5/air_pollution?lat=${lat}&lon=${long}`,
  );
  return NextResponse.json(airPollutionData.data);
}

export const GET = withError(withCoordinates(weather));
