import React, { useEffect, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, searchPosts } from "../../JS/actions/post";
import Posts from "../../Components/postList/PostsList";

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
          <h1>What is your project ? </h1>
        </div>
        <div className="search-body">
          <form className="serach-form" onSubmit={(e) => handleSearch(e)}>
            <div className="search-content">
              <div className="flex">
                <label>Rent</label>
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
                <label>By</label>
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
                placeholder="Where you want search?"
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
                placeholder="Max price $"
                className="form-control search-input"
                onChange={(e) =>
                  setSearchInput({
                    ...searchInput,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <button type="submit">Search</button>
            </div>
          </form>
        </div>
        <div className="search-footer"></div>
      </div>
      <div className="last-post-container">
        <h3 className="last-post-title"> Last posts</h3>
        <div className="last-posts-body">
          <Posts posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
