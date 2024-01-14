import React from "react";
import { useSelector } from "react-redux";

import PostCard from "../postCard/PostCard";
import Loader from "../loader/Loader";
import './postList.css'

const PostsList = ({ posts }) => {
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

export default PostsList;
