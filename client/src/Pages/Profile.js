import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LoginProfileModal from "../Components/Modal/LoginProfileModal";
import useModal from "../Components/Modal/useModal";
import jwt from "jsonwebtoken";
import { useParams } from "react-router";
const Profile = ({ location }) => {
  const { isShowing, toggle } = useModal();
  const profile = useSelector((state) => state.profileReducer.profile);
  const loadProfile = useSelector((state) => state.profileReducer.isLoad);
  // let id = location.state && location.state.id;
  const { id } = useParams();

  useEffect(() => {
    let agencyToken = localStorage.getItem("agencyToken");
    console.log(agencyToken);
    if (agencyToken) {
      const decoded = jwt.verify(agencyToken, "MYSECRETKEY");

      if (id !== decoded._id) {
        toggle();
      }
    } else {
      toggle();
    }
  }, [id]);
  return (
    <div>
      <LoginProfileModal isShowing={isShowing} toggle={toggle} />
      {loadProfile ? (
        <h3>Stana</h3>
      ) : profile ? (
        <div>
          <h3>{profile.agency_name}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
