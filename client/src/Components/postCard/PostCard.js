import * as React from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../JS/actions/post";
import houseImj from "../../assets/download.jpg";
import "./post-card.css";
import Button from "../button/Button";
import { useNavigate } from 'react-router-dom';
import PostDetails from "../postDetails/PostDetails";


const PostCard = ({ post }) => {
  const user = useSelector((state) => state.userReducer.user);
  const myAgencies = useSelector((state) => state.agencyReducer.agency);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/postdetails');
  };



  const authorisation = () => {
    let adminPriv;
    let userPoster = (post && post.poster) === (user && user._id);
    let adminPoster =
      post &&
      post.agencies &&
      post.agencies[0] &&
      post.agencies[0].id_user === (user && user._id);
    let isMyEmployeesPosts =
      myAgencies
        .map((agency) => agency._id)
        .indexOf(
          post && post.users && post.users[0] && post.users[0].id_agency
        ) > -1;

    adminPriv = user && user.role === "business" && isMyEmployeesPosts;


    return adminPoster || adminPriv || userPoster;
  };
  return (
    <div className="card" >
      <img src={houseImj} className="card-img-top" alt={post.title} />
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">
          {post.description.length > 60
            ? post.description.slice(0, 60) + "..."
            : post.description}
        </p>
       
      </div>
      <Link to={`/postdetails/${post._id}`} className="view-details">
        View Details
      </Link>     

      {authorisation() && (
        <div className="links">
          <Link to={{ pathname: "editpost", state: { id: post._id, post } }}>
            <Button label="Edit" color="light" />
          </Link>
          <Button label="Delete" color="light" clickHandler={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
