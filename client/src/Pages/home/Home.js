import React, { useEffect, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, searchPosts } from "../../JS/actions/post";
import Posts from "../../Components/postList/PostsList";
import { FaSearch } from 'react-icons/fa';




const Home = () => {
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
  return (
    <div className="home-container">
      <div className="search-container">
        <div className="search-header">
          <h1 className="question"><b>What are you planing for ?</b> </h1>
        </div>
        <div className="search-body">
          <form className="serach-form" onSubmit={(e) => handleSearch(e)}>
            <div className="search-content">
              <div className="flex">
                <label className="rent">Rent</label>
                <input
                  value="rent"
                  type="radio"
                  name="sType"
                  onChange={(e) =>
                    setSearchInput({
                      ...searchInput,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex">
                <label className="by">By</label>
                <input 
                  value="by"
                  type="radio"
                  name="sType"
                  onChange={(e) =>
                    setSearchInput({
                      ...searchInput,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
      
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
            <div className="search-button-container"
            >
              
              <button className="enter" type="submit" >
               <i>Search</i> 
                </button>

            </div>
          </form>
        </div>
        <div className="search-footer"></div>
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
