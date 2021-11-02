import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.isLoad);
  return (
    <div>
      {loadUser ? (
        <h3>Stana</h3>
      ) : user ? (
        <div>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
          <h3>{user.phone}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
