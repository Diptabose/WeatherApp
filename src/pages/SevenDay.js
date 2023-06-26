import images from "../WeatherIcons";
import { useState , memo } from "react";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../Theme.js";
import { capitalise } from "../utils/commonMethods";


function SevenDayTemplate(props) {
  const { day, description, max, min, icon } = props.outerDetails;
  const {
    sunrise,
    sunset,
    humidity,
    pressure,
    windspeed,
    winddegree,
    clouds,
    uvi,
  } = props.innerDetails;
  const isDarkMode = useSelector((state) => state.darkmode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [height, setHeight] = useState("max-h-0");

  function handleHeight() {
    if (height === "max-h-0") {
      setHeight("max-h-60");
    } else {
      setHeight("max-h-0");
    }
  }

  function todayOrNot(day) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let d = new Date(day * 1000);
    if (d.getDate() === new Date().getDate()) {
      return "Today";
    } else {
      return weekday[d.getDay()];
    }
  }

  function SunSetter(time) {
    let d = new Date(time * 1000);
    return [
      d.getHours() < 10 ? "0" + d.getHours() : d.getHours(),
      d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes(),
    ].join(":");
  }


  const template = (
    <div className="px-2 sm:min-w-[70%] sm:m-auto md:min-w-[60%]  lg:min-w-[75%] ">
      <div
        className={`flex flex-col ${theme.sevendayCardColor} ${theme.textcolor} py-2 px-2 mt-2 rounded-lg  transition-[height] duration-75 transition-[background-color] duration-700 w-full cursor-pointer `}
        onClick={handleHeight}
      >
        <div
          id="maincard"
          className="flex justify-between items-center sm:justify-between md:justify-between w-full"
        >
          <div
            id="day&weather"
            className="7xm:w-1/2 break-words"
          >
            <p className="m-0 truncate">{todayOrNot(day)}</p>
            <p className="m-0 truncate">
              {capitalise(description)}
            </p>
          </div>
          <div className="flex items-center">
            <img
              className="w-14 h-14 7xm:w-8 7xm:h-8"
              src={images["_".concat(icon)]}
              alt="morning"
            />
            <div id="maxmin" className="flex flex-col ">
              <p className="font-medium">{max}</p>
              <p>{min}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        id="innerDetails"
        className={`flex flex-col transition-[max-height] duration-[350ms] ${height} overflow-hidden  px-2 mt-1 w-full`}
      >
        <div
          className={`${theme.textcolor} flex py-3 w-full 1.5xm:flex-col 1.5xm:items-center`}
          id="details"
        >
          <div
            className={`flex border-r-2 ${theme.bordercolor} w-1/2 md:items-center 1.5xm:border-r-0 1.5xm:w-full`}
          >
            <div className="flex flex-col w-full">
              <div className="flex justify-between ">
                <p className="truncate flex-1">Sunrise</p>
                <p className="truncate flex-1">{SunSetter(sunrise)}</p>
              </div>

              <div className="flex justify-between md:justify-evenly">
                <p className="py-1 truncate flex-1">Sunset</p>
                <p className="py-1 truncate flex-1">{SunSetter(sunset)}</p>
              </div>

              <div className="flex justify-between md:justify-evenly">
                <p className="truncate flex-1">Humidity</p>
                <p className="truncate flex-1">{humidity}%</p>
              </div>

              <div className="flex justify-between md:justify-evenly">
                <p className="py-1 truncate flex-1">Pressure</p>
                <p className="py-1 truncate flex-1">{pressure} hPa</p>
              </div>
            </div>
          </div>
          <div className="flex ml-3 w-1/2 7xm:ml-0 1.5xm:w-full">
            <div className="flex flex-col w-full 1.5xm:w-full">
              <div className="flex justify-between md:justify-evenly">
                <p className="truncate flex-1 1.75xm:flex-[7]">Windspeed</p>
                <p className="truncate flex-1 1.75xm:flex-[3]">{Math.floor(windspeed)} m/s</p>
              </div>

              <div className="flex justify-between md:justify-evenly">
                <p className="py-1 truncate flex-1 1.75xm:flex-[7]">WindDegree</p>
                <p className="py-1 truncate flex-1 1.75xm:flex-[3]">{winddegree}°</p>
              </div>

              <div className="flex justify-between md:justify-evenly">
                
                <p className="truncate flex-1 1.75xm:flex-[7]">Clouds</p>
                <p className="truncate flex-1 1.75xm:flex-[3]">{clouds}%</p>
              </div>

              <div className="flex justify-between md:justify-evenly">
                <p className="py-1 truncate flex-1 1.75xm:flex-[7]">UVI</p>
                <p className="py-1 truncate flex-1 1.75xm:flex-[3]">{uvi}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return template;
}

function SevenDay(props) {
  const sevenday = (
    <div className="flex flex-col pb-2">
      {props.sevendata.map((element) => {
        const {
          dt,
          sunrise,
          sunset,
          temp,
          humidity,
          pressure,
          wind_speed,
          wind_deg,
          clouds,
          uvi,
          weather,
        } = element;
        const outerDetails = {
          day: dt,
          description: weather[0].description,
          icon: weather[0].icon,
          max: Math.ceil(temp.max),
          min: Math.ceil(temp.min),
        };
        const innerDetails = {
          sunrise: sunrise,
          sunset: sunset,
          humidity: humidity,
          pressure: pressure,
          windspeed: wind_speed,
          winddegree: wind_deg,
          clouds: clouds,
          uvi: uvi,
        };
        return (
          <SevenDayTemplate
            key={dt}
            innerDetails={innerDetails}
            outerDetails={outerDetails}
          />
        );
      })}
    </div>
  );
  return sevenday;
}
export default memo(SevenDay);
