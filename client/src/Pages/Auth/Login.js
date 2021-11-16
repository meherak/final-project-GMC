import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Notification from "../../Components/Notication";

import { login } from "../../JS/actions/user";
import "./Register.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const errors = useSelector((state) => state.userReducer.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(user, history));
  };

  return (
    <div>
      {errors && errors.map((i, el) => <Notification error={el} key={i} />)}
      <form>
        <label>Email</label>
        <input
          type="email"
          required
          placeholder="enter your email"
          name="email"
          onInput={handleUser}
          value={user.email}
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

        <input type="submit" onClick={handleLogin} />
      </form>
    </div>
  );
};

export default Login;
