import React, { createContext, useContext, useRef } from "react";
import Toast from "./Toast";
export const UpdateContext = createContext(null);

function ToastProvider({ children }) {
  const toastRef = useRef();
  const toastTimeout = useRef();

  function setToastMessage(message) {
    clearTimeout(toastTimeout.current);
    toastRef.current.classList.remove("-bottom-[40px]");
    toastRef.current.classList.add("bottom-16");
    document.querySelector("#setToastMessage").innerHTML = message;
    toastTimeout.current = setTimeout(() => {
      toastRef.current.classList.remove("bottom-16");
      toastRef.current.classList.add("-bottom-[40px]");
    }, 3000);
  }

  return (
    <>
      <Toast ref={toastRef} />
      <UpdateContext.Provider value={{ setAndShowToast: setToastMessage }}>
        {children}
      </UpdateContext.Provider>
    </>
  );
}

// Exporting the context
export const useToast = () => useContext(UpdateContext);
export default ToastProvider;
