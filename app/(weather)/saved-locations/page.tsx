import { SavedUserLocations } from "@/components/weather/saved/SavedUserLocation";
import { weatherClient } from "@/services/weather.server-client";
import { WeatherData } from "@/types/weather.types";

const SavedLocationPage = async ({ searchParams }: PageProps<"/today">) => {
  const { lat, lon } = await searchParams;

  if (!lat || !lon) {
    return <></>;
  }

  const weatherResponse = await weatherClient.get<WeatherData>(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`,
  );
  const data = weatherResponse.data;

  return (
    <>
      <SavedUserLocations
        lat={parseInt(lat as string)}
        lon={parseInt(lon as string)}
        place={data.name}
      />
    </>
  );
};
export default SavedLocationPage;
