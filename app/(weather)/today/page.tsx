import { WeatherReport } from "@/components/weather/today/WeatherReport";
import { weatherClient } from "@/services/weather.server-client";
import { WeatherData } from "@/types/weather.types";

const TodayPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

  const search = await searchParams;
  // Let the Location loader move to /today?lat=x&lon=y
  // Proxy will parse the lat and lon and send it to th headers.
  // Then most of the data can be fetched at the server side and pass a params...
  const weatherResponse = await weatherClient.get<WeatherData>(
    `/data/2.5/weather?lat=${search.lat}&lon=${search.lon}&units=metric`,
  );
  const data = weatherResponse.data;

  return <div>
    <WeatherReport today={true} weatherdata={data} place={data.name} />
  </div>;
};
export default TodayPage;