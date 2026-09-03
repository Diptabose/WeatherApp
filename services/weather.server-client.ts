import "server-only";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { isValid } from "@/lib/utils";
//import { InvalidParameterError } from "@/errors/InvalidParameterError";

export const weatherClient = axios.create({
  baseURL: process.env.OPEN_WEATHER_MAP_BASE_API,
  params: {
    appid: process.env.OPEN_WEATHER_MAP_API_KEY,
  },
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
