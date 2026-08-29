import { WeatherCompoundError } from "./compound/WeatherError";
import { WeatherCompoundLoading } from "./compound/WeatherLoading";

export function Weather() {
  return null;
}

Weather.Error = WeatherCompoundError;
Weather.Loading = WeatherCompoundLoading;
