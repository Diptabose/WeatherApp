import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../Theme.js";

function AirQualityDetails(props) {
  function elementParser(text, isSub) {
    let index = text.search(/[^A-Z]/g);
    let subscript = text.slice(index, text.length);
    if (isSub) {
      if (index === -1) {
        return "";
      } else {
        return subscript;
      }
    } else {
      if (index === -1) {
        return text;
      } else {
        return text.slice(0, index);
      }
    }
  }
  const aqd = (
    <div className="flex mb-2">
      <p className="flex-1 font-bold mr-2">
        {elementParser(props.chem.replace("_", "").toUpperCase(), false)}
        <sub>
          {elementParser(props.chem.replace("_", "").toUpperCase(), true)}
        </sub>
      </p>
      <p className="flex-1">{props.conc}</p>
    </div>
  );
  return aqd;
}

function AirQualityIndex(props) {
  const isDarkMode = useSelector((state) => state.darkmode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { main, components } = props.aqi;
  const { co, nh3, no, no2, o3, pm2_5, pm10, so2 } = components;
  const leftAir = {
    co,
    nh3,
    no,
    no2,
  };
  const rightAir = {
    o3,
    pm2_5,
    pm10,
    so2,
  };

  const aqi = (
    <div>
      <p className={`text-xl font-bold ${theme.textcolor} `}>AirQualityIndex</p>
      <div
        className={`flex items-center justify-around border-t-2 ${theme.bordercolor} xm:justify-center sm:justify-center 4xm:flex-col 3xm:flex-col md:justify-center lg:justify-center`}
      >
        <div className="h-40 w-40 rounded-full bg-rose-600 my-2 flex flex-col items-center justify-center 4xm:h-28 4xm:w-28 ">
          <p className="text-4xl tracking-wide 4xm:text-xl">AQI</p>
          <h1 className="text-3xl font-bold">{main.aqi}</h1>
        </div>

        <div className="rounded-lg py-2 bg-sky-700  my-2 xm:mx-5 sm:mx-5 md:mx-5 lg:mx-5 p-4">
          <div className="flex flex-col 3xm:flex-row xm:flex-row sm:flex-row md:flex-row lg:flex-row ">
            <div
              id="left"
              className="flex flex-col items-stretch 3xm:mr-2 xm:mr-2 sm:mr-2 md:mr-2 lg:mr-2 "
            >
              {Object.entries(leftAir).map((element) => {
                return (
                  <AirQualityDetails
                    key={element[0]}
                    chem={element[0]}
                    conc={element[1]}
                  />
                );
              })}
            </div>
            <div
              id="right"
              className="flex  flex-col items-stretch 3xm:ml-2 xm:ml-2 sm:ml-2 md:ml-2 lg:ml-2"
            >
              {Object.entries(rightAir).map((element) => {
                return (
                  <AirQualityDetails
                    key={element[0]}
                    chem={element[0]}
                    conc={element[1]}
                  />
                );
              })}
            </div>
          </div>
          <p className="text-center">
            Values in ug/m<sup>3</sup>
          </p>
        </div>
      </div>
    </div>
  );
  return aqi;
}
export default AirQualityIndex;
