import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost, findPost } from "../../JS/actions/post";

const AddPost = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  console.log(match.path);
  console.log(history.location.state.id);

  useEffect(() => {
    if (history.location.state.id) {
      dispatch(findPost(history.location.state.id));
    }
  }, [dispatch, history.location.state.id]);

  const getPost = useSelector((state) => state.postReducer.post);
  console.log(getPost);
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  if (getPost) {
    setPost({ ...getPost });
  }
  console.log(post);

  const handleAddPost = (e) => {
    e.preventDefault();
    dispatch(addPost(post, history));
  };
  return (
    <div>
      <form onSubmit={handleAddPost}>
        <div>
          <label>
            title
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={(e) =>
                setPost({ ...post, [e.target.name]: e.target.value })
              }
            />
          </label>
          <label>
            description
            <input
              type="text"
              name="description"
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, [e.target.name]: e.target.value })
              }
            />
          </label>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
