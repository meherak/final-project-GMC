import {
  ADD_AGENCY,
  DELETE_AGENCY,
  FAIL_AGENCY,
  FIND_AGENCY,
  LOAD_AGENCY,
  LOGIN_AGENCY,
  MY_AGENCYS,
  CURRENT_AGENCY,
  LOGOUT_AGENCY,
} from "../constants/agency";

const initialState = {
  agency: [],
  agencyLoggedIn: null,
  errors: null,
  isLoad: false,
};

const agencyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_AGENCY:
      return { ...state, isLoad: true };
    case LOGIN_AGENCY:
      localStorage.setItem("token", payload.agencyToken);
      return {
        ...state,
        isLoad: false,
        agencyLoggedIn: payload.agency,
      };
    case ADD_AGENCY:
      return {
        ...state,
        isLoad: false,
        agency: [...state.agency, payload.agency],
      };
    case MY_AGENCYS:
      return {
        ...state,
        isLoad: false,
        agency: payload.agency,
      };
    case FIND_AGENCY:
      return { ...state, isLoad: false, agency: payload.agency };
    case CURRENT_AGENCY:
      return {
        ...state,
        isLoad: false,
        agencyLoggedIn: payload.agency,
      };

    case DELETE_AGENCY:
      return {
        ...state,
        isLoad: false,
        agency: state.agency.filter((e) => payload.agency._id !== e._id),
      };
    case LOGOUT_AGENCY:
      localStorage.removeItem("token");
      localStorage.removeItem("agencyId");

      return {
        agency: null,
        errors: null,
        isLoad: false,
        isAuth: false,
      };

    case FAIL_AGENCY:
      return { ...state, isLoad: false, errors: payload.errors };
    default:
      return state;
  }
};
export default agencyReducer;
