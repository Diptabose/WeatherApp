import {
  weatherClient,
  withQuery,
  withError,
} from "@/services/weather.server-client";
import { LocationSearch } from "@/types/search.types";
import { NextRequest, NextResponse } from "next/server";

async function search(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const foreCastData = await weatherClient.get<LocationSearch[]>(
    `/geo/1.0/direct?q=${query}&limit=3`,
  );
  return NextResponse.json(foreCastData.data);
}

export const GET = withError(withQuery(search));
