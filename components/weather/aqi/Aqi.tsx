import { AirPollutionList } from "@/types/air-pollution.types.js";
import { AirQualityIndicator } from "./AirQualityIndicator";
import { type AirElementComposition } from "./AirElementComposition";
import { AirComposition } from "./AirComposition";
import { WeatherSectionTitle } from "../WeatherSection";

interface AirQualityIndexProps {
  aqi: AirPollutionList;
}

export function AirQualityIndex({ aqi }: AirQualityIndexProps) {
  const { main, components } = aqi;
  const { co, nh3, no, no2, o3, pm2_5, pm10, so2 } = components;
  const leftAirComposition: AirElementComposition[] = [
    { id: 1, name: "Carbon Dioxide", value: co, displayName: "CO" },
    {
      id: 2,
      name: "Nitrogen Trihydride",
      value: nh3,
      displayName: "NH",
      subscript: "3",
    },
    { id: 3, name: "Nitrous Oxide", value: no, displayName: "NO" },
    {
      id: 4,
      name: "Nitrogen Dioxide",
      value: no2,
      displayName: "NO",
      subscript: "2",
    },
  ];

  const rightAirComposition: AirElementComposition[] = [
    { id: 5, name: "Ozone", value: o3, displayName: "O", subscript: "3" },
    {
      id: 6,
      name: "Particulate Matter 2.5",
      value: pm2_5,
      displayName: "PM",
      subscript: "2.5",
    },
    {
      id: 7,
      name: "Particulate Matter 10",
      value: pm10,
      displayName: "PM",
      subscript: "10",
    },
    {
      id: 8,
      name: "Sulphur Dioxide",
      value: so2,
      displayName: "SO",
      subscript: "2",
    },
  ];

  const aqiComponent = (
    <>
      <WeatherSectionTitle name="Air Quality Index" />
      <div className="flex flex-col sm:flex-row sm:gap-2 sm:items-center sm:justify-center">
        <div className="flex items-center justify-around  text-white">
          <AirQualityIndicator aqi={main.aqi} />
        </div>
        <div>
          <AirComposition
            left={leftAirComposition}
            right={rightAirComposition}
          />
        </div>
      </div>
    </>
  );
  return aqiComponent;
}
