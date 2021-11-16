import axios from "axios";
import {
  ADD_POST,
  EDIT_POST,
  FAIL_POST,
  FIND_POST,
  LOAD_POST,
  MY_POSTS,
} from "../constants/post";
import getToken from "./getToken";
// import history from "../../history";

export const addPost = (post, history) => async (dispatch) => {
  post = { ...post };
  dispatch({ type: LOAD_POST });
  history.push("/myposts");
  try {
    let { data } = await axios.post("/api/post/addpost", post, getToken());
    dispatch({ type: ADD_POST, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};

export const myPosts = () => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let { data } = await axios.get(`/api/post/myposts`, getToken());
    dispatch({ type: MY_POSTS, payload: data });

    console.log(data);
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};

export const editPost = (editedPost) => async (dispatch) => {
  dispatch({ type: LOAD_POST });

  try {
    let { data } = await axios.put("/", editedPost, getToken());
    dispatch({ type: EDIT_POST, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};

export const findPost = (id) => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let { data } = await axios.get(`/findpost/${id}`, getToken());
    console.log(data);
    dispatch({ type: FIND_POST, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};
