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

export interface ForecastList {
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
}

export interface ForecastData {
  cod: string;
  message: number | string;
  cnt: number;
  list: ForecastList[];
  city: ForcastCity;
}

export interface AdaptForecastHourly {
  dt: number;
  temp: number;
  weather: WeatherReport[];
}

export interface AdaptForecastTemp {
  min: number;
  max: number;
  morn: number;
  day: number;
  eve: number;
  night: number;
}

export interface AdaptForecastDaily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: AdaptForecastTemp;
  humidity: number;
  pressure: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  weather: WeatherReport[];
  hours: AdaptForecastHourly[];
}
export interface AdaptForecast {
  name: string;
  current: {};
  hourly: AdaptForecastHourly[];
  daily: AdaptForecastDaily[];
}

export interface AdaptTomorrowMain {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface AdaptTomorrowSys {
  sunset: number;
  sunrise: number;
}

export interface AdaptTomorrowWind {
  speed: number;
  deg: number;
}
export interface AdaptTomorrow {
  name: string;
  dt: number;
  main: AdaptTomorrowMain;
  sys: AdaptTomorrowSys;
  wind: AdaptTomorrowWind;
  clouds: {
    all: number;
  };
  weather: WeatherReport[];
}
