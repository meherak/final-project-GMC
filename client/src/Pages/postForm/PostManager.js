import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  addPost,
  editPost,
  findPost,
  clearErrors,
} from "../../JS/actions/post";
import Loader from "../../Components/loader/Loader";
import Button from "../../Components/button/Button";

const PostManager = ({ location }) => {
  const [address, setAddress] = useState({
    city: "",
    state: "",
    street: "",
    postal_code: "",
  });

  const [post, setPost] = useState({
    title: "",
    description: "",
    price: "",
    sType: "",
    addresses: { city: "", state: "", street: "", postal_code: "" },
  });

  const isLoad = useSelector((state) => state.postReducer.isLoad);
  const errors = useSelector((state) => state.postReducer.errors);
  const getPost = useSelector((state) => state.postReducer.post);
  let getAddress = useSelector(
    (state) =>
      state &&
      state.postReducer &&
      state.postReducer.post &&
      state.postReducer.post.addresses
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (location.state && location.state.id) {
      dispatch(findPost(location.state.id));
    }
    dispatch(clearErrors());
  }, [dispatch, location.state]);

  useEffect(() => {
    if (location.state && location.state.id) {
      setPost({ ...getPost[0] });
      setAddress({ ...getAddress });
    } else {
      setPost({ title: "", description: "", price: "", sType: "" });
      setAddress({
        state: "",
        city: "",
        postal_code: "",
        street: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPost, location.state]);

  const handleAddPost = (e) => {
    e.preventDefault();

    if (location.pathname === "/editpost") {
      let editedpost = { ...post, id: location.state.id };
      let editedAddress = { ...address };

      dispatch(editPost(editedpost, editedAddress, history));
    } else if (location.pathname === "/addpost") {
      dispatch(addPost(post, address, history));
    }
  };
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mb-3">
      {isLoad ? (
        <Loader color="danger" />
      ) : errors ? (
        <h2>error</h2>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleAddPost} className="form-container">
              <div className="mb-3">
                <label>
                  Rent
                  <input
                    value="rent"
                    type="radio"
                    name="sType"
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="mb-3">
                <label>
                  By
                  <input
                    value="by"
                    type="radio"
                    name="sType"
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title :
                </label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={post && post.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price :
                </label>
                <input
                  type="text"
                  name="price"
                  className="form-control"
                  value={post && post.price}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description :
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="6"
                  name="description"
                  value={post && post.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  State :
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={address && address.state}
                  onChange={(e) => {
                    setAddress({
                      ...address,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  City :
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={address && address.city}
                  onChange={(e) => {
                    setAddress({
                      ...address,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Postal code :
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="postal_code"
                  value={address && address.postal_code}
                  onChange={(e) => {
                    setAddress({
                      ...address,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Street Number :
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="street"
                  value={address && address.street}
                  onChange={(e) => {
                    setAddress({
                      ...address,
                      [e.target.name]: e.target.value,
                    });
                  }}
                />
              </div>
              <Button
                label="Save"
                color="primary"
                type="submit"
                radius="true"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManager;
