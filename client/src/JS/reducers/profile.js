import {
  ADD_PROFILE,
  DELETE_PROFILE,
  FAIL_PROFILE,
  FIND_PROFILE,
  LOAD_PROFILE,
  LOGIN_PROFILE,
  MY_PROFILES,
} from "../constants/profile";

const initialState = {
  profile: [],
  errors: null,
  isLoad: false,
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PROFILE:
      return { ...state, isLoad: true };
    case LOGIN_PROFILE:
      localStorage.setItem("agencyToken", payload.agencyToken);
      return { ...state, isLoad: false, profile: payload.profile };
    case ADD_PROFILE:
      return {
        ...state,
        isLoad: false,
        profile: [...state.profile, payload.profile],
      };
    case MY_PROFILES:
      return {
        ...state,
        isLoad: false,
        profile: payload.profile,
      };
    case FIND_PROFILE:
      return { ...state, isLoad: false, profile: payload.profile };
    case DELETE_PROFILE:
      return {
        ...state,
        isLoad: false,
        profile: state.profile.filter((e) => payload.profile._id !== e._id),
      };

    case FAIL_PROFILE:
      return { ...state, isLoad: false, errors: payload.errors };
    default:
      return state;
  }
};
export default profileReducer;
