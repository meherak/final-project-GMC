import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";
import agencyReducer from "./agency";
import addressReducer from "./address";
const rootReducer = combineReducers({
  userReducer,
  postReducer,
  agencyReducer,
  addressReducer,
});
export default rootReducer;
