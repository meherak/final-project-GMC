import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addEmployer } from "../JS/actions/employer";
import { register } from "../JS/actions/user";

const AddEmployer = ({ isShowing, hide }) => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    phone: 0,
  });

  //   const errors = useSelector((state) => state.userReducer.errors);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    let employer = { ...user, role: "employer" };

    dispatch(addEmployer(employer));
    hide();
  };

  return (
    <div>
      <form>
        <label>Name</label>
        <input
          type="text"
          placeholder="employer psedo"
          required
          name="name"
          onInput={handleUser}
          value={user.name}
        />
        <label>Password</label>
        <input
          type="password"
          required
          placeholder="enter your password"
          min={6}
          name="password"
          onInput={handleUser}
          value={user.password}
        />
        <label>Phone</label>
        <input
          type="number"
          placeholder="enter your phone number"
          name="phone"
          onInput={handleUser}
          value={user.phone}
        />
        <input type="submit" onClick={handleRegister} />
      </form>
    </div>
  );
};

export default AddEmployer;
