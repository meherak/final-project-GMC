import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPost, editPost, findPost } from "../../JS/actions/post";

const PostManager = ({ location }) => {
  const [address, setAddress] = useState({
    state: "",
    city: "",
    postal_code: "",
    street: "",
  });

  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const loadPost = useSelector((state) => state.postReducer.isLoad);
  const errors = useSelector((state) => state.postReducer.errors);
  const getPost = useSelector((state) => state.postReducer.post);
  const getAddress = useSelector((state) => state.addressReducer.address);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (location.state && location.state.id)
      dispatch(findPost(location.state.id));
  }, [dispatch, location.state]);

  useEffect(() => {
    if (location.state && location.state.id) {
      setPost(getPost);
      setAddress(getAddress);
    } else {
      setPost({ title: "", description: "" });
      setAddress({
        state: "",
        city: "",
        postal_code: "",
        street: "",
      });
    }
  }, [getPost, location.state]);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (location.pathname === "/editpost") {
      let editedpost = { ...post, id: location.state.id };
      dispatch(editPost(editedpost, history));
    } else if (location.pathname === "/addpost") {
      dispatch(addPost(post, address, history));
    }
  };
  console.log(post);
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
            <div>
              <label>
                Post address
                <div>
                  <label>
                    State
                    <input
                      type="text"
                      name="state"
                      value={address && address.state}
                      onChange={(e) => {
                        setAddress({
                          ...address,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />
                  </label>
                  <label>
                    City
                    <input
                      type="text"
                      name="city"
                      value={address && address.city}
                      onChange={(e) => {
                        setAddress({
                          ...address,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />
                  </label>
                  <label>
                    Postal code
                    <input
                      type="text"
                      name="postal_code"
                      value={address && address.postal_code}
                      onChange={(e) => {
                        setAddress({
                          ...address,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />
                  </label>
                  <label>
                    Street
                    <input
                      type="text"
                      name="street"
                      value={address && address.street}
                      onChange={(e) => {
                        setAddress({
                          ...address,
                          [e.target.name]: e.target.value,
                        });
                      }}
                    />
                  </label>
                </div>
              </label>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostManager;
