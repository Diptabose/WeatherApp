import { weatherClient } from "@/services/weather.server-client";
import { AirPollutionData } from "@/types/air-pollution.types";
import { AirQualityIndex } from "./Aqi";

interface WeatherAqiProps {
    lat: number,
    lon: number
}


export async function WeatherAqi({ lat, lon }: WeatherAqiProps) {
    const airPollutionResponse = await weatherClient.get<AirPollutionData>(
        `/data/2.5/air_pollution?lat=${lat}&lon=${lon}`,
    );
    const data = airPollutionResponse.data;
    return (
        <AirQualityIndex aqi={data.list[0]} />
    )
}