import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer.js";
const reducers = combineReducers({
  darkmode: darkModeReducer,
});
export default reducers;
