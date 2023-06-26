import { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../Theme.js";
import images from "../WeatherIcons";

function SetWeatherImages(icon) {
  switch (icon) {
    case "Humidity":
      return images.humidity;
    case "Max":
      return images.max;
    case "Min":
      return images.min;
    case "Pressure":
      return images.pressure;
    case "UVI":
      return images._01d;
    case "Speed":
      return images.wind;
    case "WindDeg":
      return images.deg;
    case "Clouds":
      return images._03d;
    default:
      return images._01d;
  }
}

function metric(param) {
  switch (param) {
    case "Humidity":
      return "%";
    case "Max":
      return "°C";
    case "Min":
      return "°C";
    case "Pressure":
      return "hPa";
    case "UVI":
      return "";
    case "Speed":
      return "m/s";
    case "WindDeg":
      return "°";
    case "Clouds":
      return "%";
    default:
      return "";
  }
}

function WeatherParamsSetter(props) {
  const details = (
    <div
      className={`flex items-center w-40 sm:justify-around md:justify-around lg:justify-around mb-2 sm:w-56 md:w-56 lg:w-56 md:max-w-full 2xm:flex-col 2xm:max-w-full xs:flex-col xs:max-w-full`}
    >
      <div className="flex flex-1 flex-col items-center justify-center sm:mr-2 md:mr-2">
        <img
          className="w-10 h-10"
          src={SetWeatherImages(props.param)}
          alt={props.param}
        />
        <p className="font-bold truncate">{props.param}</p>
      </div>
      <div className="flex flex-1 md:pl-8 lg:pl-8">
        <p className="truncate">
          {props.paramvalue}
          {metric(props.param)}
        </p>
      </div>
    </div>
  );
  return details;
}

function WeatherDetails(props) {
  // const [degrees,setDeg]= useState(135);
  const halfProgress = useRef(null);
  const isDarkMode = useSelector((state) => state.darkmode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { wind, clouds, sys } = props.weatherdata;
  const { temp_min, temp_max, pressure, humidity } = props.weatherdata.main;
  const detailsLeft = {
    Min: Math.floor(temp_min),
    Max: Math.ceil(temp_max),
    Pressure: pressure,
    Humidity: humidity,
  };
  const detailsRight = {
    Speed: wind.speed,
    WindDeg: wind.deg,
    Clouds: clouds.all,
    UVI: props.uvi,
  };

  function SunSetter(time) {
    if (time < 0) {
      return "00:00";
    } else {
      let d = new Date(time);
      return [
        d.getHours() < 10 ? "0" + d.getHours() : d.getHours(),
        d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes(),
      ].join(":");
    }
  }

  function SunTotal(time) {
    if (time < 0) {
      return "00:00 hrs";
    }
    let min = Math.floor(time / 60);
    let hours = min / 60;
    let minDec = hours % 1;
    let Hour = Math.floor(hours);
    let Min = Math.floor(minDec * 60);
    return (
      (Hour < 10 ? "0" + Hour : Hour) +
      ":" +
      (Min < 10 ? "0" + Min : Min) +
      " hrs"
    );
  }

  const calcDeg = useCallback(() => {
    let d = new Date();
    let progress = d.getTime() - sys.sunrise * 1000;
    let total = (sys.sunset - sys.sunrise) * 1000;
    let degree = Math.ceil((progress / total) * 180);

    if (!props.today) {
      document.getElementById("sunImg").style.transform = `rotate(0deg)`;
      document.documentElement.style.setProperty("--rotor", `rotate(135deg)`);
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && degree <= 180) {
            document.getElementById(
              "sunImg"
            ).style.transform = `rotate(${degree}deg)`;
            document.documentElement.style.setProperty(
              "--rotor",
              `rotate(${135 + degree}deg)`
            );
          } else if (entries[0].isIntersecting && degree > 180) {
            document.getElementById(
              "sunImg"
            ).style.transform = `rotate(180deg)`;
            document.documentElement.style.setProperty(
              "--rotor",
              `rotate(315deg)`
            );
          }
        },
        { threshold: 1.0 }
      );
      observer.observe(halfProgress.current);
    }
  }, [props.today, sys.sunrise, sys.sunset]);

  useEffect(() => {
    calcDeg();
  }, [calcDeg]);

  const weatherdetails = (
    <div className={`${theme.textcolor} my-1`}>
      <p className={`${theme.textcolor} text-xl font-bold`}>Details</p>
      <div className={`border-t-2 pt-2 ${theme.bordercolor} py-4 w-full `}>
        <div
          className={`rounded-lg py-2 ${theme.detailsColor}  my-2 min-w-fit flex sm:w-8/12 md:w-8/12 sm:m-auto md:m-auto lg:w-8/12 lg:m-auto xxs:m-auto lg:my-2 2xm:flex-col 2xm:min-w-full  xxs:w-8/12  xs:min-w-full`}
        >
          <div
            id="left"
            className=" w-1/2 flex flex-col items-center border-r-2  2xm:w-full 2xm:border-r-0"
          >
            <div className=" flex flex-col md:w-8/12 lg:w-8/12 xs:w-full 2xm:w-full  2xm:items-center ">
              {Object.entries(detailsLeft).map((element) => {
                return (
                  <WeatherParamsSetter
                    key={element[0]}
                    param={element[0]}
                    paramvalue={element[1]}
                  />
                );
              })}
            </div>
          </div>
          <div
            id="right"
            className="w-1/2 flex flex-col items-center 2xm:w-full "
          >
            <div className="flex flex-col md:w-8/12 lg:w-8/12 xs:w-full 2xm:w-full 2xm:items-center">
              {Object.entries(detailsRight).map((element) => {
                return (
                  <WeatherParamsSetter
                    key={element[0]}
                    param={element[0]}
                    paramvalue={element[1]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={`border-b-2 ${theme.bordercolor}`}>
        <p className={`font-bold text-xl ${theme.textcolor}`}>SunRise/SunSet</p>
      </div>

      <div className="flex  flex-col items-center justify-center w-full mt-4 mb-4">
        <div className="flex flex-col items-center 2xm:text-xs">
          <div
            ref={halfProgress}
            id="progress"
            className={`progress relative overflow-hidden w-64 h-32 6xm:w-32 6xm:h-16 5xm:w-52 5xm:h-28 border-b-4 border-gray-700 flex items-end after:absolute after:top-0 after:left-0 6xm:after:w-32 6xm:after:h-32 5xm:after:w-52 5xm:after:h-52 after:w-64 after:h-64 after:border-[16px] 6xm:after:border-[8px] 5xm:after:border-[12px] after:border-t-orange-500 after:border-r-orange-500 after:border-b-gray-400 after:border-l-gray-400 after:block  after:rounded-full after:transition-[transform] after:duration-[4000ms]`}
          >
            <div
              id="sunImg"
              className={`flex-1 block z-[2] transition-[transform] duration-[4000ms] `}
            >
              <img
                className="w-10 h-10 -translate-x-3 translate-y-1/2 6xm:w-8 6xm:h-8"
                src={images._01d}
                alt="sun"
              />
            </div>
          </div>
          <div className="flex justify-between self-stretch 6xm:w-32 5xm:w-52 5xm:self-center">
            <div className="-translate-x-1/4 flex flex-col self-start  5xm:-translate-x-3.5 6xm:-translate-x-2.5 items-center">
              <img className={`w-10 h-10`} alt="sunrise" src={images.sunrise} />
              <p>{SunSetter(sys.sunrise * 1000)}</p>
            </div>
            <div className="translate-x-1/4 flex flex-col self-start 5xm:translate-x-3.5 6xm:translate-x-3 items-center">
              <img className={`w-10 h-10`} alt="sunset" src={images.sunset} />
              <p>{SunSetter(sys.sunset * 1000)}</p>
            </div>
          </div>
          <div className="inline-block flex items-center justify-center">
            <div className="flex flex-col">
              <p>Total Time:</p>
              <p>Time Left:</p>
            </div>
            <div className="flex flex-col mx-4 ">
              <p>{SunTotal(sys.sunset - sys.sunrise)}</p>
              <p>
                {SunTotal(sys.sunset - Math.floor(new Date().getTime() / 1000))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return weatherdetails;
}
export default WeatherDetails;
