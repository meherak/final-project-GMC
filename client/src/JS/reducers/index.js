import { combineReducers } from "redux";
import userReducer from "./user";
import postReducer from "./post";
import profileReducer from "./profile";
const rootReducer = combineReducers({
  userReducer,
  postReducer,
  profileReducer,
});
export default rootReducer;
