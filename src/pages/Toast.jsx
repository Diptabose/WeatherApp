import Icon from "../WeatherBG/logo512.png";
import { useState, useEffect } from "react";

function Toast(props) {
  
  const [isToast, setToast] = useState(false);

  useEffect(() => {
    const id1 = setTimeout(function () {
      setToast(true);
    }, 500);
    
    let id2 = null;
    const id = setTimeout(function () {
      setToast(false);
      id2 = setTimeout(() => {
        props.restoreToaster(false, null);
      }, 500);
    }, 3500);
    return () => {
      clearTimeout(id1);
      clearTimeout(id);
      clearTimeout(id2);
      setToast(false);
    };
  }, [props]);

  const toast = (
    <div
      className={`${
        isToast ? "bottom-16" : "-bottom-[40px]"
      } flex fixed z-[7] left-0 right-0 transition-[bottom] duration-300 justify-center bottom-16`}
    >
      <div className="inline-block flex items-center w-fit px-2 py-1 bg-white text-black shadow-lg rounded-l-full rounded-r-full">
        <img className="w-7 h-7" src={Icon} alt="WeatherApp" />
        <span className="ml-1">{props.message}</span>
      </div>
    </div>
  );

  return toast;
}
export default Toast;
