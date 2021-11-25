import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProfile } from "../JS/actions/profile";

const AddProfile = ({ toggle }) => {
  const [profile, setProfile] = useState({ agency_name: "", password: "" });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProfile(profile));
    setProfile({ agency_name: "", password: "" });
    toggle(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Agency Name
          <input
            type="text"
            name="agency_name"
            value={profile && profile.agency_name}
            onChange={(e) =>
              setProfile({ ...profile, [e.target.name]: e.target.value })
            }
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={profile && profile.password}
            onChange={(e) =>
              setProfile({ ...profile, [e.target.name]: e.target.value })
            }
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProfile;
