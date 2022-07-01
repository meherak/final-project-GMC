import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import { allPosts, searchPosts } from "../../JS/actions/post";
import Posts from "../../Components/posts/Posts";
import "./home.css";

const GET_POSTS = gql`
  query posts {
    posts {
      _id
      title
      description
      poster {
        ... on Agency {
          agency_name
        }
        ... on User {
          name
        }
      }
    }
  }
`;

const Home = () => {
  const [searchInput, setSearchInput] = useState({
    sType: null,
    location: null,
    price: null,
  });
  // const posts = useSelector((state) => state.postReducer.post);
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(GET_POSTS);
  let { posts } = data ?? [];

  // useEffect(() => {
  //   dispatch(allPosts(data.posts));
  // }, [dispatch]);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchPosts(searchInput));
  };
  return (
    <div className="home-container">
      <div className="search-container">
        {/* <img alt="home search" src={searchImg}></img> */}
        <div className="search-header">
          <h1>What is your project ? </h1>
        </div>
        <div className="search-body">
          <form className="serach-form" onSubmit={(e) => handleSearch(e)}>
            <label>
              Rent
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
            </label>
            <label>
              By
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
            </label>
            <label>
              <input
                type="text"
                name="location"
                placeholder="Where you want search?"
                onChange={(e) =>
                  setSearchInput({
                    ...searchInput,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
            <label>
              <input
                type="text"
                name="price"
                placeholder="Max price $"
                onChange={(e) =>
                  setSearchInput({
                    ...searchInput,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>

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
          <Posts posts={posts} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default Home;
