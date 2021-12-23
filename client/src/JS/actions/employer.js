import axios from "axios";
import {
  ADD_EMPLOYER,
  FAIL_EMPLOYER,
  LOAD_EMPLOYER,
  MY_EMPLOYERS,
} from "../constants/employer";
import localStorageConfig from "./localStorageConfig";

export const addEmployer = (newUser) => async (dispatch) => {
  dispatch({ type: LOAD_EMPLOYER });
  try {
    let { data } = await axios.post(
      "/api/employer/addemployer",
      newUser,
      localStorageConfig()
    );
    console.log(data);
    dispatch({ type: ADD_EMPLOYER, payload: data }); //payload:{msg,employer}
  } catch (error) {
    dispatch({ type: FAIL_EMPLOYER, payload: error.response.data });
  }
};

export const myEmployers = () => async (dispatch) => {
  dispatch({ type: LOAD_EMPLOYER });
  try {
    let { data } = await axios.get(
      `/api/employer/myemployers`,
      localStorageConfig()
    );
    dispatch({ type: MY_EMPLOYERS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: FAIL_EMPLOYER, payload: error.response.data });
  }
};
