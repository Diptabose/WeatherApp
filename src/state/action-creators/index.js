export function enableDarkMode(darkModeState) {
  return (dispatch) => {
    dispatch({
      type: "darkmode",
      payload: darkModeState,
    });
  };
}
