import {
  ADD_EMPLOYER,
  DELETE_EMPLOYER,
  FAIL_EMPLOYER,
  FIND_EMPLOYER,
  LOAD_EMPLOYER,
  MY_EMPLOYERS,
} from "../constants/employer";

const initialState = {
  employer: [],
  errors: null,
  isLoad: false,
};

const employerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_EMPLOYER:
      return { ...state, isLoad: true };
    case ADD_EMPLOYER:
      return {
        ...state,
        isLoad: false,
        employer: [...state.employer, payload.employer],
      };
    case MY_EMPLOYERS:
      return {
        ...state,
        isLoad: false,
        employer: payload.employer,
      };
    case FIND_EMPLOYER:
      return { ...state, isLoad: false, employer: payload.employer };

    case DELETE_EMPLOYER:
      return {
        ...state,
        isLoad: false,
        employer: state.employer.filter((e) => payload.employer._id !== e._id),
      };
    case FAIL_EMPLOYER:
      return { ...state, isLoad: false, errors: payload.errors };
    default:
      return state;
  }
};

export default employerReducer;
