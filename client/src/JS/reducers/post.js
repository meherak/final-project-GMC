import {
  ADD_POST,
  FAIL_POST,
  FIND_POST,
  LOAD_POST,
  MY_POSTS,
} from "../constants/post";

const initialState = {
  post: null,
  errors: null,
  isLoad: false,
  isAuth: false,
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_POST:
      return { ...state, isLoad: true };
    case ADD_POST:
      return { ...state, isLoad: false, post: payload.post };
    case MY_POSTS:
      return {
        ...state,
        isLoad: false,
        post: payload.post,
      };
    case FIND_POST:
      return { isLoad: false, post: payload.post };
    case FAIL_POST:
      return { ...state, isLoad: false, errors: payload.errors };
    default:
      return state;
  }
};
export default postReducer;
