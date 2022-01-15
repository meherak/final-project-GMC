import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { myPosts, clearErrors } from "../../JS/actions/post";
import PostCard from "./PostCard";
import Loader from "../loader/Loader";

const Posts = ({ posts }) => {
  const isLoad = useSelector((state) => state.postReducer.isLoad);
  const errors = useSelector((state) => state.postReducer.errors);

  return (
    <div className="container">
      {isLoad ? (
        <Loader color="danger" />
      ) : errors ? (
        <h1>Error</h1>
      ) : (
        <div className="posts-container">
          {posts &&
            posts.map((post) => <PostCard post={post} key={Math.random()} />)}
        </div>
      )}
    </div>
  );
};

export default Posts;
