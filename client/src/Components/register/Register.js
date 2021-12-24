import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { register } from "../../JS/actions/user";
import Notification from "../Notication";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const errors = useSelector((state) => state.userReducer.errors);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log(user);
  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(user, history));
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
                <a className="nav-link" aria-current="page" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/register">Register</a>
              </li>
            </ul>
          </div>
          <div className="form-container">
            <form onSubmit={handleRegister}>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Your Name"
                name="email"
                onInput={handleUser}
                value={user.name}
              />
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
              <input
                type="text"
                placeholder="Your phone number"
                name="phone"
                className="form-control"
                onInput={handleUser}
                value={user.phone}
              />
              <div className="form-group d-flex justify-content-center">
                <div className="form-check mr-3">
                  <input
                    value="business"
                    type="radio"
                    className="form-check-input"
                    name="role"
                    onInput={handleUser}
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Business
                  </label>
                </div>
                <div class="form-check">
                  <input
                    value="particular"
                    type="radio"
                    className="form-check-input"
                    name="role"
                    onInput={handleUser}
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Particular
                  </label>
                </div>
              </div>
              {/* <input
                value="particular"
                type="radio"
                name="role"
                onInput={handleUser}
              />
              <input
                value="business"
                type="radio"
                name="role"
                onInput={handleUser}
              /> */}
              <input type="submit" className="btn btn-primary" value="Sign In" />
            </form>
          </div>
        </div>
      </div >
    </div >
    // <>
    //   {errors && errors.map((el) => <Notification error={el} />)}
    //   <form>
    //     <label>Name</label>
    //     <input
    //       type="text"
    //       placeholder="enter your name"
    //       required
    //       name="name"
    //       onInput={handleUser}
    //       value={user.name}
    //     />
    //     <label>Email</label>
    //     <input
    //       type="email"
    //       required
    //       placeholder="enter your email"
    //       name="email"
    //       onInput={handleUser}
    //       value={user.email}
    //     />
    //     <label>Password</label>
    //     <input
    //       type="password"
    //       required
    //       placeholder="enter your password"
    //       min={6}
    //       name="password"
    //       onInput={handleUser}
    //       value={user.password}
    //     />
    //     <label>Phone</label>
    //     <input
    //       type="number"
    //       placeholder="enter your phone number"
    //       name="phone"
    //       onInput={handleUser}
    //       value={user.phone}
    //     />
    //     <label>
    //       Particular
    //       <input
    //         value="particular"
    //         type="radio"
    //         name="role"
    //         onInput={handleUser}
    //       />
    //     </label>
    //     <label>
    //       Business
    //       <input
    //         value="business"
    //         type="radio"
    //         name="role"
    //         onInput={handleUser}
    //       />
    //     </label>
    //     <input type="submit" onClick={handleRegister} />
    //   </form>
    // </>
  );
};

export default Register;
