import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

import {
  addPost,
  editPost,
  findPost,
  clearErrors,
} from "../../JS/actions/post";
import Loader from "../../Components/loader/Loader";
import Button from "../../Components/button/Button";

import "./PostForm.css";

const PostForm = () => {
  const [address, setAddress] = useState({
    city: "",
    state: "",
    street: "",
    postal_code: "",
  });

  const [characteristics, setCharacteristics] = useState([]);

  const [post, setPost] = useState({
    title: "",
    description: "",
    price: "",
    sType: "",
    addresses: { city: "", state: "", street: "", postal_code: "" },
    characteristics: [],
  });

  const location = useLocation();
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
  const navigate = useNavigate();

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

  const fetchCharacteristic = useCallback(async () => {
    let characteristicResponse = await axios.get(`/api/characteristic/all`);

    characteristicResponse.data.data.forEach((characteristic) => {
      setCharacteristics((prev) => {
        const isSelected = post.characteristics?.some(
          (_characteristic) =>
            _characteristic?.content?.slug === characteristic.slug
        );
        return [
          ...prev,
          {
            isSelected,
            content: characteristic,
          },
        ];
      });
    });
  },[]);

  // get all characteristics on component init
  useEffect(() => {
    fetchCharacteristic();
  }, [fetchCharacteristic]);

  const handleAddPost = (e) => {
    e.preventDefault();

    if (location.pathname === "/editpost") {
      let editedpost = { ...post, id: location.state.id };
      let editedAddress = { ...address };

      dispatch(editPost(editedpost, editedAddress, navigate));
    } else if (location.pathname === "/addpost") {
      dispatch(addPost(post, address, navigate));
    }
  };
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleSelectCharacteristique = (index) => {
    setCharacteristics((prevCharacteristics) => {
      prevCharacteristics[index] = {
        ...prevCharacteristics[index],
        isSelected: !prevCharacteristics[index].isSelected,
      };
      return [...prevCharacteristics];
    });
    setPost((prevPost) => {
      return {
        ...prevPost,
        characteristics: characteristics
          .filter((characteristic) => characteristic["isSelected"])
          .map((characteristic) => characteristic.content._id),
      };
    });
  };

  return (
    <div className="container mb-3">
      {isLoad ? (
        <Loader color="danger" />
      ) : errors ? (
        <h2>error</h2>
      ) : (
        <div className="row justify-content-start text-left">
          <p className="title text-black my-5">Add New Post</p>
          <div className="col-md-6">
            <form onSubmit={handleAddPost} className="form-container">
              <div className="mb-4">
                <label htmlFor="sType" className="form-label">
                  Listing Type :
                </label>
                <div className="d-flex justify-content-between">
                  <div className="flex-grow-1 pr-2">
                    <input
                      id="RENT"
                      value="RENT"
                      type="radio"
                      name="sType"
                      className="btn-check"
                      onChange={handleChange}
                    />
                    <label className="btn btn-outline-primary" for="RENT">
                      Rent
                    </label>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      id="SALE"
                      value="SALE"
                      type="radio"
                      name="sType"
                      className="btn-check"
                      onChange={handleChange}
                    />
                    <label className="btn btn-outline-primary" for="SALE">
                      Sale
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
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
              <div className="mb-4">
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

              <div className="mb-4">
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

              <div className="mb-4">
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

              <div className="mb-4">
                <label htmlFor="title" className="form-label">
                  City :
                </label>
                <div className="input-group">
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
              </div>

              <div className="mb-4">
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

              <div className="mb-4">
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

              <div className="mb-4">
                <label htmlFor="sType" className="form-label">
                  Characteristics :
                </label>
                <div className="d-flex flex-wrap">
                  {characteristics.map((characteristic, index) => {
                    return (
                      <div
                        key={index}
                        className={`
                      m-2 
                      px-3 py-1 
                      rounded-pill 
                      flex justify-content-center align-items-center 
                      cursor-pointer 
                      text-light
                      ${
                        characteristic.isSelected
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                        onClick={(e) => handleSelectCharacteristique(index)}
                      >
                        <p className="m-0">{characteristic.content.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5">
                <Button
                  label="Save"
                  color="primary"
                  type="submit"
                  radius="true"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostForm;
