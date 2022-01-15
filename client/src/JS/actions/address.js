import axios from "axios";
import { ADD_ADDRESS, FAIL_ADDRESS, LOAD_ADDRESS } from "../constants/address";
import localStorageConfig from "./localStorageConfig";

export const addAddress = (address, id, onModelAddress) => async (dispatch) => {
  address = { ...address, on_address: id, onModelAddress };
  dispatch({ type: LOAD_ADDRESS });

  try {
    let { data } = await axios.post(
      "/api/address/addaddress",
      address,
      localStorageConfig()
    );

    dispatch({ type: ADD_ADDRESS, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_ADDRESS, payload: error.response.data });
  }
};

export const editAddress = (editedAddress) => async (dispatch) => {
  dispatch({ type: LOAD_ADDRESS });

  try {
    let { data } = await axios.put(
      "/api/address/editaddress",
      editedAddress,
      localStorageConfig()
    );

    console.log(data);
  } catch (error) {
    dispatch({ type: FAIL_ADDRESS, payload: error.response.data });
  }
};
