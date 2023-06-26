import React from "react";
import weatherbg from "../WeatherBG";
import { Link } from "react-router-dom";

function locationTemplateBg() {
    let locationImages = [
      weatherbg.foggy,
      weatherbg.night,
      weatherbg.night1,
      weatherbg.night2,
      weatherbg.rainy,
      weatherbg.sunrise,
    ];
    return locationImages[Math.floor(Math.random() * (5 - 1 + 1) + 1)];
  }


function LocationCardTemplate(props) {
    const { lat, long, location } = props.data;
    const lt = (
      <div
        style={{
          backgroundImage: `url(${locationTemplateBg()})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className={`p-4 text-white m-2 rounded-md flex shadow-md bg-cyan-800 object-cover relative cursor-pointer text-xs 3.25xm:w-[47%] 3.3xm:w-[44%] 3.3xm:p-2 3.3xm:justify-between 1.5sm:w-[31%] lg:w-[23.3%] 3.5xm:w-[45%] 4xm:w-[100%] 4xm:p-2 4xm:mx-0 overflow-hidden`}
      >
        <Link
          aria-label="loadsavedlocation"
          to="/"
          className="flex-[9]"
          onClick={() => {
            const pos = { coords: { lat: lat, long: long } };
            props.saved(pos);
          }}
        >
          <p className="font-bold text-xl 4xm:text-xs 4xm:truncate 3.3xm:text-sm 3,.3xm:truncate">
            {location}
          </p>
          <div className="my-1">
            <span className="mr-2">Longitude</span>
            <span>{lat}</span>
          </div>
          <span className="mr-2">Latitude</span>
          <span>{long}</span>
        </Link>
        <div
          className="flex-[1] flex flex-col items-center justify-center "
          onClick={() => {
            props.cardRemove(location);
          }}
        >
          <button
            aria-label="removecard"
            className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-700 text-white font-bold text-xs cursor-pointer 3.3xm:w-3 3.3xm:h-3 4xm:w-3 4xm:h-3 "
          >
            &minus;
          </button>
        </div>
      </div>
    );
    return lt;
  }

  export default LocationCardTemplate;