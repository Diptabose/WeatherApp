import { LocationSearch } from "@/types/search.types";
import axios from "axios";

const weatherClient = axios.create({
  adapter: "fetch",
  baseURL: "/api", // We need to proxy the requests to the api layer provided by Next.
});

function weather(lat: number, long: number, signal?: AbortSignal) {

}
function forecast(lat: number, long: number, signal?: AbortSignal) {

}
function airPollution(lat: number, long: number, signal?: AbortSignal) {
  
}
export async function search(query: string) {
  const searchResults = await weatherClient.get<LocationSearch[]>(
    `/search?q=${query}`,
  );
  return searchResults.data;
}
