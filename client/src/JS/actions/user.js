import axios from "axios";
import {
  CLEAR_ERRORS,
  CURRENT_USER,
  FAIL_USER,
  LOAD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
} from "../constants/user";
import getToken from "./getToken";

export const register = (newUser, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let { data } = await axios.post("/api/user/register", newUser);
    console.log(data);
    dispatch({ type: REGISTER_USER, payload: data }); //payload:{msg,user,token}
    history.push("/profile");
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const login = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let { data } = await axios.post("/api/user/login", user); //email+password
    dispatch({ type: LOGIN_USER, payload: data }); //payload:{msg,user,token}
    history.push("/profile");
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const current = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    let { data } = await axios.get("/api/user/me", getToken());
    dispatch({ type: CURRENT_USER, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
  }
};

export const logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
