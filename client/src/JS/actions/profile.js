import axios from "axios";
// import Myprofiles from "../../Pages/Profiles/Myprofiles";
import {
  ADD_PROFILE,
  DELETE_PROFILE,
  FAIL_PROFILE,
  FIND_PROFILE,
  LOAD_PROFILE,
  LOGIN_PROFILE,
  MY_PROFILES,
} from "../constants/profile";
import getToken from "./getToken";
// import history from "../../history";

export const addProfile = (profile, history) => async (dispatch) => {
  profile = { ...profile };
  dispatch({ type: LOAD_PROFILE });

  try {
    let { data } = await axios.post(
      "/api/profile/addprofile",
      profile,
      getToken()
    );

    dispatch({ type: ADD_PROFILE, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_PROFILE, payload: error.response.data });
  }
};

export const myProfiles = () => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
  try {
    let { data } = await axios.get(`/api/profile/myprofiles`, getToken());
    // console.log(data);
    dispatch({ type: MY_PROFILES, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_PROFILE, payload: error.response.data });
  }
};

export const editProfile = (editedProfile, history) => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE });

  try {
    let { data } = await axios.put(
      "/api/profile/editprofile",
      editedProfile,
      getToken()
    );
    dispatch(myProfiles());
    history.push("/myprofiles");
    console.log(data);
  } catch (error) {
    dispatch({ type: FAIL_PROFILE, payload: error.response.data });
  }
};

export const findProfile = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
  try {
    let { data } = await axios.get(
      `/api/profile/findprofile/${id}`,
      getToken()
    );

    dispatch({ type: FIND_PROFILE, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_PROFILE, payload: error.response.data });
  }
};
export const deleteProfile = (id) => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
  try {
    let { data } = await axios.delete(`/api/profile/${id}`, getToken());
    dispatch({ type: DELETE_PROFILE, payload: data });
    // dispatch(myProfiles());
  } catch (error) {
    dispatch({ type: FAIL_PROFILE, payload: error.response.data });
  }
};
export const loginProfile = (id, password) => async (dispatch) => {
  dispatch({ type: LOAD_PROFILE });
  try {
    console.log(password);
    let { data } = await axios.post(
      `/api/profile/loginprofile/${id}`,
      password,
      getToken()
    ); //password
    dispatch({ type: LOGIN_PROFILE, payload: data }); //payload:{msg,profile,token}
  } catch (error) {
    dispatch({ type: FAIL_PROFILE, payload: error.response.data });
  }
};
