import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../JS/actions/user";

import "./login.css";

const Login = ({ toggle }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    isAgency: false,
  });
  const errors = useSelector((state) => state.userReducer.errors);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(login(user, navigate));
    toggle();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Your Email"
          name="email"
          onInput={handleUser}
          value={user.email}
        />
        <input
          type="password"
          required
          className="form-control"
          placeholder="Password"
          min={6}
          name="password"
          onInput={handleUser}
          value={user.password}
        />
        <input type="submit" className="btn btn-primary" value="Sign In" />
      </form>
    </div>
  );
};

export default Login;
