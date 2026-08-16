import React, { forwardRef } from "react";
import Icon from "../background-images/logo512.png";

const Toast = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className={`flex fixed z-[7] left-0 right-0 transition-[bottom] duration-300 justify-center -bottom-[40px] }`}
    >
      <div className="flex items-center w-fit px-2 py-1 bg-white text-black shadow-lg rounded-l-full rounded-r-full">
        <img className="w-7 h-7" src={Icon} alt="WeatherApp" />
        <span id="setToastMessage" className="ml-1"></span>
      </div>
    </div>
  );
});

export default Toast;
