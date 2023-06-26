import { lightTheme, darkTheme } from "../Theme.js";
import { useSelector } from "react-redux";
import images from "../WeatherIcons/index.js";
import { setHour } from "../utils/commonMethods.js";

function WeatherHourlySetter(props) {
 
  const data = (
    <div className="flex flex-col items-center px-4 py-4 m-2 rounded bg-sky-900 ">
      <p id="hourtime">{setHour(props.time)}</p>
      <img
        className="w-15 h-15"
        src={images["_".concat(props.icon)]}
        alt=""
      />
      <p id="temp">{Math.ceil(props.temp)}°C</p>
    </div>
  );
  return data;
}

function WeatherHourly(props) {
  const isDarkMode = useSelector((state) => state.darkmode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const weatherhourly = (
    <div>
      <p
        className={`${theme.textcolor} mt-10 mb-2 font-bold text-xl border-b-2 ${theme.bordercolor}`}
      >
        Hourly
      </p>
      <div
        className={`flex mt-2 m-auto max-w-5xl py-2 overflow-y-scroll myscroll `}
      >
        {props.hourly.map((element) => {
          const { dt, temp, weather } = element;
          return (
            <WeatherHourlySetter
              key={dt}
              time={dt}
              temp={temp}
              icon={weather[0].icon}
            />
          );
        })}
      </div>
    </div>
  );
  return weatherhourly;
}
export default WeatherHourly;
