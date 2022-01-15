import axios from "axios";
import { addAddress } from "./address";
import {
  ADD_AGENCY,
  CURRENT_AGENCY,
  DELETE_AGENCY,
  FAIL_AGENCY,
  FIND_AGENCY,
  LOAD_AGENCY,
  LOGIN_AGENCY,
  MY_AGENCYS,
  LOGOUT_AGENCY,
} from "../constants/agency";
import localStorageConfig from "./localStorageConfig";
// import history from "../../history";

export const addAgency = (agency, address) => async (dispatch) => {
  agency = { ...agency };
  address = { ...address };
  dispatch({ type: LOAD_AGENCY });
  try {
    const { data } = await axios.post(
      "/api/agency/addagency",
      agency,
      localStorageConfig()
    );

    dispatch({ type: ADD_AGENCY, payload: data });

    let { _id } = data.agency;
    dispatch(addAddress(address, _id, "agency"));
  } catch (error) {
    dispatch({ type: FAIL_AGENCY, payload: error.response.data });
  }
};

export const myAgencys = () => async (dispatch) => {
  dispatch({ type: LOAD_AGENCY });
  try {
    let { data } = await axios.get(
      `/api/agency/myagencys`,
      localStorageConfig()
    );
    dispatch({ type: MY_AGENCYS, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_AGENCY, payload: error.response.data });
  }
};

export const editAgency = (editedAgency, history) => async (dispatch) => {
  dispatch({ type: LOAD_AGENCY });

  try {
    let { data } = await axios.put(
      "/api/agency/editagency",
      editedAgency,
      localStorageConfig()
    );
    dispatch(myAgencys());
    history.push("/myagencys");
    console.log(data);
  } catch (error) {
    dispatch({ type: FAIL_AGENCY, payload: error.response.data });
  }
};

export const findAgency = (id) => async (dispatch) => {
  dispatch({ type: LOAD_AGENCY });
  try {
    let { data } = await axios.get(
      `/api/agency/findagency/${id}`,
      localStorageConfig()
    );

    dispatch({ type: FIND_AGENCY, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_AGENCY, payload: error.response.data });
  }
};
export const deleteAgency = (id) => async (dispatch) => {
  dispatch({ type: LOAD_AGENCY });
  try {
    let { data } = await axios.delete(
      `/api/agency/${id}`,
      localStorageConfig()
    );
    dispatch({ type: DELETE_AGENCY, payload: data });
    // dispatch(myAgencys());
  } catch (error) {
    dispatch({ type: FAIL_AGENCY, payload: error.response.data });
  }
};
export const loginAgency = (user, history) => async (dispatch) => {
  dispatch({ type: LOAD_AGENCY });
  try {
    console.log(user);
    let { data } = await axios.post(
      `/api/agency/loginagency`,
      user,
      localStorageConfig()
    ); //password
    dispatch({ type: LOGIN_AGENCY, payload: data }); //payload:{msg,agency,token}
    history.push(`/agency/${data.agency._id}`);
  } catch (error) {
    dispatch({ type: FAIL_AGENCY, payload: error.response.data });
  }
};

export const currentAgency = () => async (dispatch) => {
  dispatch({ type: LOAD_AGENCY });

  try {
    let { data } = await axios.get("/api/agency/me", localStorageConfig());

    dispatch({ type: CURRENT_AGENCY, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_AGENCY });
    console.log(error);
  }
};
export const logoutAgency = () => async (dispatch) => {
  dispatch({ type: LOGOUT_AGENCY });
};
