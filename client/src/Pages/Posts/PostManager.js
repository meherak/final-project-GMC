import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost, editPost, findPost } from "../../JS/actions/post";

const PostManager = ({ location }) => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const loadPost = useSelector((state) => state.postReducer.isLoad);
  const errors = useSelector((state) => state.postReducer.errors);
  const getPost = useSelector((state) => state.postReducer.post);

  const dispatch = useDispatch();
  const history = useHistory();

  console.log(location);

  useEffect(() => {
    if (location.state && location.state.id)
      dispatch(findPost(location.state.id));
  }, []);
  useEffect(() => {
    if (location.state && location.state.id) {
      setPost(getPost);
    } else {
      setPost({ title: "", description: "" });
    }
  }, [getPost]);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (location.pathname === "/editpost") {
      let editedpost = { ...post, id: location.state.id };
      dispatch(editPost(editedpost, history));
    } else if (location.pathname === "/addpost") {
      dispatch(addPost(post, history));
    }
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {loadPost ? (
        <h2>fi 3a9lek</h2>
      ) : errors ? (
        <h2>error</h2>
      ) : (
        <div>
          <form onSubmit={handleAddPost}>
            <div>
              <label>
                title
                <input
                  type="text"
                  name="title"
                  value={post && post.title}
                  onChange={handleChange}
                />
              </label>
              <label>
                description
                <input
                  type="text"
                  name="description"
                  value={post && post.description}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Submit</button>
              <button type="delete">Delete</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostManager;
