import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myPosts } from "../../JS/actions/post";
// import Post from "../../Components/CardPost";
import "./MyPosts.css";
import CardPost from "../../Components/CardPost";

const Myposts = () => {
  const loadPost = useSelector((state) => state.postReducer.isLoad);
  const errors = useSelector((state) => state.postReducer.errors);
  const posts = useSelector((state) => state.postReducer.post);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myPosts());
  }, [dispatch]);

  return (
    <div className="MyPosts">
      {loadPost ? (
        <h1>fi 3a9lek</h1>
      ) : errors ? (
        <h1>Error</h1>
      ) : (
        posts &&
        posts.map((post) => <CardPost post={post} key={Math.random()} />)
      )}
    </div>
  );
};

export default Myposts;
