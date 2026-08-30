import { WeatherAqi } from "@/components/weather/aqi/WeatherAq";
import WeatherDetails from "@/components/weather/details/WeatherDetails";
import { WeatherOneCall } from "@/components/weather/hourly/WeatherOneCall";
import { SavedUserLocations } from "@/components/weather/saved/SavedUserLocation";
import { WeatherReport } from "@/components/weather/today/WeatherReport";
import { weatherClient } from "@/services/weather.server-client";
import { WeatherData } from "@/types/weather.types";
import { Triangle } from "lucide-react";
import { Suspense } from "react";

const SavedLocationPage = async ({ searchParams }: PageProps<"/today">) => {
    const { lat, lon } = await searchParams;

    if (!lat || !lon) {
        return <></>;
    }

    const weatherResponse = await weatherClient.get<WeatherData>(
        `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`,
    );
    const data = weatherResponse.data;

    return <>
        <SavedUserLocations lat={parseInt(lat as string)} lon={parseInt(lon as string)} place={data.name} />
    </>;
};
export default SavedLocationPage;