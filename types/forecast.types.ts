import {
  WeatherCloud,
  WeatherCoordinates,
  WeatherReport,
  WeatherWind,
} from "./weather.types";

export interface ForecastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
  dew_point: number;
}

export interface ForcastCity {
  id: number;
  name: string;
  coord: WeatherCoordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastData {
  cod: string;
  message: number | string;
  cnt: number;
  list: {
    dt: number;
    main: ForecastMain;
    weather: WeatherReport[];
    clouds: WeatherCloud;
    wind: WeatherWind;
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: ForcastCity;
}
