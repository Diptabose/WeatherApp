import {memo} from "react";
import WeatherReport from "./WeatherReport.js";
import WeatherHourly from "./WeatherHourly.js";
import WeatherDetails from "./WeatherDetails.js";
import AirQualityIndex from "./AirQualityIndex.js";
import WeatherPlot from "./WeatherPlot.js";


function Today(props) {
  const { weatherData, oneCallData, Aqi } = props.weatherData;

  let hourlyData = oneCallData.hourly.slice(0, 24);


  const today = (
    <div>
      <WeatherReport
        today={true}
        weatherdata={weatherData}
        place={weatherData.name}
      />
      <WeatherHourly hourly={hourlyData} />
      <WeatherPlot hourly={hourlyData} />
      <WeatherDetails
        weatherdata={weatherData}
        uvi={oneCallData.current.uvi}
        today={true}
      />
      <AirQualityIndex aqi={Aqi.list[0]} />
    </div>
  );
  return today;
}
export default memo(Today);
