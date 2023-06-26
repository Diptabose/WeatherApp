function reducer(state = false, action) {
  if (action.type === "darkmode") {
    return (state = action.payload);
  } else {
    return state;
  }
}
export default reducer;
