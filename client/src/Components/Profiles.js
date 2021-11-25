import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { myProfiles } from "../JS/actions/profile";
import AddProfile from "./AddProfile";
import Profile from "../Pages/Profile";

const Profiles = ({ hide }) => {
  const [addProfile, setAddProfile] = useState(false);
  const profile = useSelector((state) => state.profileReducer.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(myProfiles());
  }, []);

  return (
    <div>
      <button onClick={() => setAddProfile(false)}>My Profiles</button>
      <button onClick={() => setAddProfile(true)}>Add Profile</button>
      <div>
        {addProfile ? (
          <AddProfile toggle={setAddProfile} />
        ) : (
          profile.map((e) => (
            <Link
              to={{ pathname: `/profile/${e._id}`, state: { id: e._id } }}
              key={Math.random()}
              onClick={() => {
                hide();
              }}
            >
              {e.agency_name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Profiles;
