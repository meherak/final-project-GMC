import axios from "axios";
// import Myposts from "../../Pages/Posts/Myposts";
import {
  ADD_POST,
  DELETE_POST,
  FAIL_POST,
  FIND_POST,
  LOAD_POST,
  MY_POSTS,
  CLEAR_ERRORS
} from "../constants/post";
import { addAddress } from "./address";
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

    console.log(data);
    history.push("/myposts");
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};

export const myPosts = () => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let { data } = await axios.get(`/api/post/myposts`, localStorageConfig());
    dispatch({ type: MY_POSTS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};

export const editPost = (editedPost, history) => async (dispatch) => {
  dispatch({ type: LOAD_POST });

  try {
    let { data } = await axios.put(
      "/api/post/editpost",
      editedPost,
      localStorageConfig()
    );
    dispatch(myPosts());
    history.push("/myposts");
    console.log(data);
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
    console.log(error);
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

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
