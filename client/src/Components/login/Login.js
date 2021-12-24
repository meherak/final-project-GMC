import Notification from "../Notication";
import { useHistory } from "react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../JS/actions/user";

import "./login.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    isAgency: false,
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
    <div className="login-wrapper">
      <div className="login-content">
        <div className="login-header">
          <div className="header-wrapper" onClick={() => history.push('/')}>
            <svg viewBox="0 0 512 512"><path d="M280.5 256L495.9 40.5c6.7-6.7 6.7-17.7 0-24.4s-17.7-6.7-24.4 0L256 231.6 40.5 16.1c-6.7-6.7-17.7-6.7-24.4 0s-6.7 17.7 0 24.4L231.6 256 16.1 471.5c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0L256 280.5 471.5 496c6.7 6.7 17.7 6.7 24.4 0s6.7-17.7 0-24.4L280.5 256z"></path></svg>
          </div>
        </div>
        <div className="login-body">
          <div className="tabs-container">
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
              </li>
            </ul>
          </div>
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
        </div>
      </div>
    </div>
    // <div>
    //   <div>
    //     {errors && errors.map((i, el) => <Notification error={el} key={i} />)}
    //     <form onSubmit={handleLogin}>
    //       <label>Email</label>
    //       <input
    //         type="text"
    //         required
    //         placeholder="enter your email"
    //         name="email"
    //         onInput={handleUser}
    //         value={user.email}
    //       />
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         required
    //         placeholder="enter your password"
    //         min={6}
    //         name="password"
    //         onInput={handleUser}
    //         value={user.password}
    //       />
    //       {/* <label>
    //         Agency account
    //         <input
    //           type="checkbox"
    //           onChange={() => setUser({ ...user, isAgency: !user.isAgency })}
    //         />
    //       </label> */}
    //       <input type="submit" />
    //     </form>
    //   </div>
    // </div>
  );
};

export default Login;
