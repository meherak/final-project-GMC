import { ADD_ADDRESS } from "../constants/address";
const initialState = {
  address: {},
  errors: null,
  isLoad: false,
};
const addressReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ADDRESS:
      return {
        ...state,
        isLoad: false,
        address: payload.address,
      };

    default:
      return state;
  }
};
export default addressReducer;
