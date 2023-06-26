import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../Theme.js";
import images from "../WeatherIcons";
import { greeter , capitalise } from "../utils/commonMethods.js";


function WeatherReport(props) {
  const isDarkMode = useSelector((state) => state.darkmode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { weather, main, clouds, wind, dt } = props.weatherdata;

  const weatherreport = (
    <div className={`${theme.textcolor} flex flex-col justify-center `}>
      <p>{greeter()}</p>
      <p className={`${theme.textcolor} text-3xl font bold 2xm:text-2xl`}>
        {props.today ? null : "Its Tomorrow!!!"}
      </p>
      <p id="loactionName" className="text-2xl font-bold 2xm:text-xl">
        {props.place}
      </p>
      <p>
        {props.today
          ? new Date(dt * 1000).toDateString()
          : new Date(dt * 1000).toDateString()}
      </p>
      <div id="weatherimg and temp" className={`flex flex-col`}>
        <div id="blur" className={`relative  flex  justify-center`}>
          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <div className="blur-[50px] w-20 h-20 rounded-full bg-yellow-400"></div>
            <div className="blur-[50px] w-20 h-20 rounded-full bg-sky-400"></div>
          </div>
          <img
            className="z-[1] text-center w-32 h-32"
            src={images["_".concat(weather[0].icon)]}
            alt=""
          />
        </div>
        <div className={`flex flex-col items-center`}>
          <p className="text-center">
            {capitalise(weather[0].description)}
          </p>
          <h1 className="temperature my-2 ml-6 text-8xl font-bold 2xm:text-7xl">
            {Math.ceil(main.temp)}
            <sup className="text-sky-500">°</sup>
          </h1>
        </div>
      </div>
      <div
        id="3cards"
        className="flex justify-evenly my-2 md:w-1/2 lg:w-1/2 md:m-auto md:justify-between lg:m-auto lg:justify-between 2xm:text-xs "
      >
        <div className="flex flex-col items-center">
          <img className="w-14 h-14" src={images._03d} alt="" />
          <p className="">{clouds.all}%</p>
          <p>Clouds</p>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-14 h-14" src={images.humidity} alt="" />
          <p>{main.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div className="flex flex-col items-center">
          <img className="w-14 h-14" src={images.wind} alt="" />
          <p>{wind.speed}m/s</p>
          <p>Wind</p>
        </div>
      </div>
    </div>
  );
  return weatherreport;
}
export default WeatherReport;
