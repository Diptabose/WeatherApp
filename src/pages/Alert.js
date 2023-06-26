import NoSignal from "../AlertIcons/noSignal.png";
import NoService from "../AlertIcons/searchManualLoaction.png";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../Theme.js";

function Alert(props) {
  const isDarkMode = useSelector((state) => state.darkmode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  let borderColor = null;
  if (props.data.isGPS === 0) {
    borderColor = "border-rose-700";
  } else {
    borderColor = "border-sky-700";
  }

  const alert = (
    <div className="h-full flex flex-col items-center justify-center relative">
        <div
          className={`${theme.textcolor} px-4 py-2  ${borderColor} border-2 rounded-md font-bold absolute top-6 max-w-fit self-center`}
        >
          {props.data.alertMsg}
        </div>
        <div className="self-center">
          <div className="bg-gray-300 p-8 rounded-full">
            <img
              className="w-40 h-40 1.15sm:w-28 1.15sm:h-28 xs:w-20 xs:h-20 2xm:w-12 2xm:h-12"
              src={props.data.isGPS === 0 ? NoSignal : NoService}
              alt="NoService/NoSignal"
            />
          </div>
        </div>
    </div>
  );
  return alert;
}
export default Alert;

//className="h-1/2 flex flex-col justify-between sm:h-2/5 md:h-2/5 lg:h-2/5"
