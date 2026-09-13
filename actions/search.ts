"use server";
import { normalizePlaceName } from "@/lib/weather";
import { weatherClient } from "@/services/weather.server-client";
import { LocationSearch } from "@/types/search.types";

export async function search(query: string) {
  const foreCastData = await weatherClient.get<LocationSearch[]>(
    `/geo/1.0/direct?q=${query}&limit=3`,
  );
  return foreCastData.data.map((location) => ({
    ...location,
    name: normalizePlaceName(location.name),
    state: location.state ? normalizePlaceName(location.state) : location.state,
  }));
}
