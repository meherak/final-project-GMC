import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";
import agencyReducer from "./agency";
import addressReducer from "./address";
import employerReducer from "./employer";
const rootReducer = combineReducers({
  userReducer,
  postReducer,
  agencyReducer,
  addressReducer,
  employerReducer,
});
export default rootReducer;
