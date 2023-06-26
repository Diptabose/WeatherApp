import { memo } from "react";
import WeatherReport from "./WeatherReport.js";
import WeatherHourly from "./WeatherHourly.js";
import WeatherDetails from "./WeatherDetails.js";
import WeatherPlot from "./WeatherPlot.js";


function Tommorow(props) {
  const {
    sunrise,
    sunset,
    temp,
    pressure,
    humidity,
    wind_speed,
    wind_deg,
    weather,
    clouds,
    uvi,
    dt,
  } = props.tommorowData.daily[1];

  function tempSet() {
    let date = new Date();
    let h = date.getHours();
    if (h >= 0 && h <= 11) {
      return temp.morn;
    } else if (h > 12 && h <= 15) {
      return temp.day;
    } else if (h > 15 && h <= 18) {
      return temp.eve;
    } else {
      return temp.night;
    }
  }
  const temperature = tempSet();
  const weatherData = {
    dt: dt,
    main: {
      temp: temperature,
      temp_min: temp.min,
      temp_max: temp.max,
      pressure: pressure,
      humidity: humidity,
    },
    sys: {
      sunset: sunset,
      sunrise: sunrise,
    },
    wind: {
      speed: wind_speed,
      deg: wind_deg,
    },
    clouds: {
      all: clouds,
    },
    weather: weather,
  };

  let hourlyData = props.tommorowData.hourly.slice(24);

                                                                                   

  const tommorow = (
    <div>
      <WeatherReport
        place={props.place}
        today={false}
        weatherdata={weatherData}
      />
      <WeatherHourly hourly={hourlyData} />
      <WeatherPlot hourly={hourlyData} />
      <WeatherDetails weatherdata={weatherData} uvi={uvi} today={false} />
    </div>
  );
  return tommorow;
}
export default memo(Tommorow);
