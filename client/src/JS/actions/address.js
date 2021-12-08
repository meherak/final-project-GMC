import axios from "axios";
// import Myagencys from "../../Pages/Agencys/Myagencys";
import {
  ADD_ADDRESS,
  FAIL_ADDRESS,
  LOAD_ADDRESS,
  //   CURRENT_AGENCY,
  //   DELETE_AGENCY,
  //   FAIL_AGENCY,
  //   FIND_AGENCY,
  //   LOAD_AGENCY,
  //   LOGIN_AGENCY,
  //   MY_AGENCYS,
  //   LOGOUT_AGENCY,
} from "../constants/address";
import localStorageConfig from "./localStorageConfig";
// import history from "../../history";

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
