export interface WeatherCoordinates {
  lon: number;
  lat: number;
}

export interface WeatherReport {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface WeatherCloud {
  all: number;
}

export interface WeatherSys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  coord: WeatherCoordinates;
  weather: WeatherReport[];
  base: "stations";
  main: WeatherMain;
  visibility: number;
  wind: WeatherWind;
  clouds: WeatherCloud;
  dt: number;
  sys: WeatherSys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}


