import axios from "axios";
// import Myposts from "../../Pages/Posts/Myposts";
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
import { addAddress, editAddress } from "./address";
import localStorageConfig from "./localStorageConfig";
// import history from "../../history";

export const addPost = (post, address, history) => async (dispatch) => {
  post = { ...post };
  dispatch({ type: LOAD_POST });

  try {
    let { data } = await axios.post(
      "/api/post/addpost",
      post,
      localStorageConfig()
    );
    dispatch({ type: ADD_POST, payload: data });
    let { _id } = data.post;
    dispatch(addAddress(address, _id, "post"));

   // history.push("/posts");
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error });
  }
};

export const myPosts = () => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let { data } = await axios.get(`/api/post/myposts`, localStorageConfig());
    dispatch({ type: MY_POSTS, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};

export const allPosts = () => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let { data } = await axios.get(`/api/post/`);
    dispatch({ type: ALL_POSTS, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};

export const editPost =
  (editedPost, editedAddress, history) => async (dispatch) => {
    dispatch({ type: LOAD_POST });

    try {
      await axios.put("/api/post/editpost", editedPost, localStorageConfig());
      dispatch(editAddress(editedAddress));

      dispatch(myPosts());

      history.push("/posts");
    } catch (error) {
      dispatch({ type: FAIL_POST, payload: error.response.data });
    }
  };

export const findPost = (id) => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let { data } = await axios.get(
      `/api/post/findpost/${id}`,
      localStorageConfig()
    );

    dispatch({ type: FIND_POST, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};
export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let { data } = await axios.delete(`/api/post/${id}`, localStorageConfig());
    dispatch({ type: DELETE_POST, payload: data });
    // dispatch(myPosts());
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};

export const searchPosts = (searchInput) => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  let config = { params: { ...searchInput } };
  console.log(config);
  try {
    let { data } = await axios.get("/api/post/searchposts", config);
    dispatch({ type: SEARCH_POST, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
