import "server-only";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { isValid } from "@/lib/utils";
import { getMockDataForUrl } from "@/services/weather.mock-data";
//import { InvalidParameterError } from "@/errors/InvalidParameterError";

export const weatherClient = axios.create({
  baseURL: process.env.OPEN_WEATHER_MAP_BASE_API,
  params: {
    appid: process.env.OPEN_WEATHER_MAP_API_KEY,
  },
});

// Serves mocked responses instead of hitting the OpenWeatherMap API so we
// don't burn API call quota while iterating locally, until Next.js caching
// is in place. Toggle with MOCK_WEATHER_API=true.
weatherClient.interceptors.request.use((config) => {
  if (process.env.MOCK_WEATHER_API === "true") {
    config.adapter = async (requestConfig) => ({
      data: getMockDataForUrl(requestConfig.url ?? ""),
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: requestConfig,
    });
  }
  return config;
});

export function withCoordinates<T>(
  callback: (
    request: NextRequest,
  ) => Promise<NextResponse<T>> | NextResponse<T>,
) {
  return async function (req: NextRequest): Promise<NextResponse<T>> {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const long = searchParams.get("long");
    if (!isValid(lat) || !isValid(long)) {
      throw new Error("Invalid paramters recieved for latitude or longitude");
    }
    return await callback(req);
  };
}

export function withQuery<T>(
  callback: (
    request: NextRequest,
  ) => Promise<NextResponse<T>> | NextResponse<T>,
) {
  return async function (req: NextRequest): Promise<NextResponse<T>> {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q");
    if (query?.trim() === "") {
      throw new Error("Invalid paramters recieved for Query");
    }
    return await callback(req);
  };
}

export function withError<T>(
  callback: (
    request: NextRequest,
  ) => Promise<NextResponse<T>> | NextResponse<T>,
) {
  return async function (request: NextRequest) {
    try {
      return await callback(request);
    } catch (err) {
      if (err instanceof AxiosError) {
        return NextResponse.json(
          { message: err?.message ?? "Internal Server Error" },
          { status: err?.status ?? 500 },
        );
      }
      const error = err as { message?: string; status?: number };
      return NextResponse.json(
        {
          message: error?.message ?? "Internal Server Error",
        },
        { status: error?.status ?? 500 },
      );
    }
  };
}
