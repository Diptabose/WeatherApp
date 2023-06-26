import Weather from "./pages/Weather.js";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index.js";


import ToastProvider from "./components/ToastProvider.js";

function App() {

  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const isStoreDark = useSelector((state) => state.darkmode);
  const [osDark, setOsDark] = useState(
    window.matchMedia("(prefers-color-scheme:dark)").matches
  );

  window
    .matchMedia("(prefers-color-scheme:dark)")
    .addEventListener("change", function (e) {
      const theme = e.matches ? true : false;
      if (theme) {
        setOsDark(true);
      } else {
        setOsDark(false);
      }
    });

  useEffect(() => {
    const localDark = window.localStorage.getItem("userPreferredDark");

    if (localDark === null || localDark === undefined) {
      if (osDark) {
        actions.enableDarkMode(true);
      } else {
        actions.enableDarkMode(false);
      }
    } else if (localDark === "true") {
      actions.enableDarkMode(true);
    } else if (localDark === "false") {
      actions.enableDarkMode(false);
    }
  }, [osDark, actions]);

  function handleTheme() {
    if (isStoreDark) {
      window.localStorage.setItem("userPreferredDark", "false");
      actions.enableDarkMode(false);
    } else {
      window.localStorage.setItem("userPreferredDark", "true");
      actions.enableDarkMode(true);
    }
  }

  return (
    <ToastProvider>
       <div className="w-full font-OnePlusSlate flex h-full">
          <Weather toggleDarkMode={handleTheme} />
       </div>
    </ToastProvider>
    
  );
}

export default App;
