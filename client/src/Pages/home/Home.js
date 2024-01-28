import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { allPosts, searchPosts } from "../../JS/actions/post";
import Posts from "../../Components/postList/PostsList";
import Button from "../../Components/button/Button";

import "./home.css";


const Home = () => {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState({
    sType: null,
    location: null,
    price: null,
  });
  const posts = useSelector((state) => state.postReducer.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allPosts());
  }, [dispatch]);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchPosts(searchInput));
  };

  useEffect(() => {
    const currentRoute = location.pathname;
    console.log("Current Route:", currentRoute);
  }, [location.pathname]);

  return (
    <div className="home-container">
      <div className="search-container">
        <div className="carousel-content">
          <div className="mb-4">
            <h1 className="text-dark font-weight-bold">
              What are you planing for ?
            </h1>
          </div>
          <div className="d-flex bg-light">
            <div className="flex-grow-1">
              <input
                id="RENT"
                value="RENT"
                type="radio"
                name="sType"
                className="btn-check"
                onChange={(e) =>
                  setSearchInput({
                    ...searchInput,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <label
                className="btn btn-outline-secondary w-100 rounded-0"
                for="RENT"
              >
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
                onChange={(e) =>
                  setSearchInput({
                    ...searchInput,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <label
                className="btn btn-outline-secondary w-100 rounded-0"
                for="SALE"
              >
                Purchase
              </label>
            </div>
          </div>
          <div className="search-card">
            <div className="search-body">
              <form className="serach-form" onSubmit={(e) => handleSearch(e)}>
                <div className="search-content">
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter a place , an address ..."
                    className="form-control search-input"
                    onChange={(e) =>
                      setSearchInput({
                        ...searchInput,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter a price $$$"
                    className="form-control search-input"
                    onChange={(e) =>
                      setSearchInput({
                        ...searchInput,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="search-button-container">
                  <Button label="Search" type="submit" color="primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="last-post-container">
        <h3 className="last-post-title"> Latest offers</h3>
        <div className="last-posts-body">
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
