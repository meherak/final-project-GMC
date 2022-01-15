import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myPosts } from "../../JS/actions/post";
import Posts from "./Posts";

const MyPosts = () => {
  const posts = useSelector((state) => state.postReducer.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearErrors());
    dispatch(myPosts());
  }, [dispatch]);

  return (
    <div className="myposts-container">
      <Posts posts={posts} />
    </div>
  );
};

export default MyPosts;
