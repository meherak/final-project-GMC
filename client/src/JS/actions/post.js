import axios from "axios";
// import Myposts from "../../Pages/Posts/Myposts";
import {
  ADD_POST,
  DELETE_POST,
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

  try {
    let { data } = await axios.post("/api/post/addpost", post, getToken());
    dispatch({ type: ADD_POST, payload: data });
    console.log(data);
    history.push("/myposts");
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

export const editPost = (editedPost, history) => async (dispatch) => {
  dispatch({ type: LOAD_POST });

  try {
    let { data } = await axios.put(
      "/api/post/editpost",
      editedPost,
      getToken()
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
    let { data } = await axios.get(`/api/post/findpost/${id}`, getToken());

    dispatch({ type: FIND_POST, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};
export const deletePost = (id) => async (dispatch) => {
  dispatch({ type: LOAD_POST });
  try {
    let { data } = await axios.delete(`/api/post/${id}`, getToken());
    dispatch({ type: DELETE_POST, payload: data });
    // dispatch(myPosts());
  } catch (error) {
    dispatch({ type: FAIL_POST, payload: error.response.data });
  }
};
