import { WeatherCoordinates } from "./weather.types";

export interface AirPollutionComponents {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

export interface AirPollutionList {
  main: AirPollutionMain;
  components: AirPollutionComponents;
  dt: number;
}

export interface AirPollutionMain {
  aqi: number;
}

export interface AirPollutionData {
  coord: WeatherCoordinates;
  list: AirPollutionList[];
}
