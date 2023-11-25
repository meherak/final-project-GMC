import React from "react";
import { useSelector } from "react-redux";

const PostDetails = (postId) => {
  const post = useSelector((state) => {
    return state.postReducer.posts.find((p) => p._id === postId);
  });
  if (!post) {
    return <div>Loading...</div>; 
  }
    return (
        <div className="div-container">
             <div className="imageannounce">
      <img src="https://dummyimage.com/144x141/000/fff.jpg" alt="Dummy Image" />
      <h1>{post.space}</h1>
      <p>{post.numberOfRooms}</p>
      <h2>{post.address}</h2>
    </div>
   
        </div>
    )
}
export default PostDetails