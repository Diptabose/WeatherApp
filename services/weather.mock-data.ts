import "server-only";
import { WeatherData } from "@/types/weather.types";
import { ForecastData, ForecastList } from "@/types/forecast.types";
import { AirPollutionData } from "@/types/air-pollution.types";
import { LocationSearch } from "@/types/search.types";

const NOW = Math.floor(Date.now() / 1000);

const MOCK_WEATHER_REPORT = [
  {
    id: 800,
    main: "Clear",
    description: "clear sky",
    icon: "01d",
  },
];

export const mockWeatherData: WeatherData = {
  coord: { lon: 88.3639, lat: 22.5726 },
  weather: MOCK_WEATHER_REPORT,
  base: "stations",
  main: {
    temp: 28,
    feels_like: 30,
    temp_min: 26,
    temp_max: 30,
    pressure: 1010,
    humidity: 65,
    sea_level: 1010,
    grnd_level: 1005,
  },
  visibility: 10000,
  wind: { speed: 3.5, deg: 180, gust: 5 },
  clouds: { all: 10 },
  dt: NOW,
  sys: { country: "IN", sunrise: NOW - 3600 * 6, sunset: NOW + 3600 * 6 },
  timezone: 19800,
  id: 1275004,
  name: "Kolkata",
  cod: 200,
};

const mockForecastList: ForecastList[] = Array.from({ length: 40 }, (_, i) => ({
  dt: NOW + i * 3 * 3600,
  main: {
    temp: 26 + (i % 5),
    feels_like: 28 + (i % 5),
    temp_min: 24 + (i % 5),
    temp_max: 30 + (i % 5),
    pressure: 1010,
    sea_level: 1010,
    grnd_level: 1005,
    humidity: 60 + (i % 20),
    temp_kf: 0,
    dew_point: 20,
  },
  weather: MOCK_WEATHER_REPORT,
  clouds: { all: 10 + (i % 30) },
  wind: { speed: 3 + (i % 4), deg: 180, gust: 5 },
  visibility: 10000,
  pop: (i % 10) / 10,
  sys: { pod: i % 8 < 4 ? "d" : "n" },
  dt_txt: new Date((NOW + i * 3 * 3600) * 1000).toISOString(),
}));

export const mockForecastData: ForecastData = {
  cod: "200",
  message: 0,
  cnt: mockForecastList.length,
  list: mockForecastList,
  city: {
    id: 1275004,
    name: "Kolkata",
    coord: { lon: 88.3639, lat: 22.5726 },
    country: "IN",
    population: 4631392,
    timezone: 19800,
    sunrise: NOW - 3600 * 6,
    sunset: NOW + 3600 * 6,
  },
};

export const mockAirPollutionData: AirPollutionData = {
  coord: { lon: 88.3639, lat: 22.5726 },
  list: [
    {
      main: { aqi: 2 },
      components: {
        co: 200.5,
        no: 0.1,
        no2: 12.3,
        o3: 45.6,
        so2: 5.4,
        pm2_5: 18.2,
        pm10: 25.1,
        nh3: 1.2,
      },
      dt: NOW,
    },
  ],
};

export const mockLocationSearch: LocationSearch[] = [
  {
    name: "Kolkata",
    local_names: { en: "Kolkata" },
    lat: 22.5726,
    lon: 88.3639,
    country: "IN",
    state: "West Bengal",
  },
];

export function getMockDataForUrl(url: string): unknown {
  if (url.includes("/geo/1.0/direct")) return mockLocationSearch;
  if (url.includes("/data/2.5/forecast")) return mockForecastData;
  if (url.includes("/data/2.5/air_pollution")) return mockAirPollutionData;
  if (url.includes("/data/2.5/weather")) return mockWeatherData;
  return mockWeatherData;
}
