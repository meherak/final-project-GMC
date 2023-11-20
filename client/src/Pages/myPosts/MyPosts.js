import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearErrors, myPosts } from "../../JS/actions/post";
import PostsList from "../../Components/postList/PostsList";

const MyPosts = () => {
  const posts = useSelector((state) => state.postReducer.post);
  console.log(posts,'posts');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(myPosts());
  }, [dispatch]);

  return (
    <div className="myposts-container">
      <PostsList posts={posts} />
    </div>
  );
};

export default MyPosts;
