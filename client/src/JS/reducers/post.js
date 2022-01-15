import {
  ADD_POST,
  DELETE_POST,
  FAIL_POST,
  FIND_POST,
  LOAD_POST,
  MY_POSTS,
  CLEAR_ERRORS,
  ALL_POSTS,
  SEARCH_POST,
} from "../constants/post";

const initialState = {
  post: [],
  errors: null,
  isLoad: false,
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_POST:
      return { ...state, isLoad: true };
    case ADD_POST:
      return { ...state, isLoad: false, post: [...state.post, payload.post] };
    case MY_POSTS:
      return {
        ...state,
        isLoad: false,
        post: payload.post,
      };
    case ALL_POSTS:
      return {
        ...state,
        isLoad: false,
        post: payload.posts,
      };

    case FIND_POST:
      return {
        ...state,
        isLoad: false,
        post: payload.post,
      };
    case SEARCH_POST:
      return {
        ...state,
        isLoad: false,
        post: payload.post,
      };
    case DELETE_POST:
      return {
        ...state,
        isLoad: false,
        post: state.post.filter((e) => payload.post._id !== e._id),
      };
    case FAIL_POST:
      return { ...state, isLoad: false, errors: payload.errors };
    case CLEAR_ERRORS:
      return { ...state, errors: null };
    default:
      return state;
  }
};
export default postReducer;
