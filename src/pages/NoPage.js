import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../Theme.js";

function NoPage(props) {
  const isDarkMode = useSelector((state) => state.darkmode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const nopage = (
    <div className={`mx-5 my-5 ${theme.textcolor}`}>
      <h1 className="text-xl font-bold">Requested page doesnt exist</h1>
      <p className="text-lg">{props.appname}</p>
    </div>
  );
  return nopage;
}
export default NoPage;
