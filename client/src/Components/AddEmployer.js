import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployer } from "../JS/actions/employer";
import "./login/login.css";

const AddEmployer = ({ isShowing, toggle }) => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    phone: 0,
  });

  const dispatch = useDispatch();

  const handleUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    toggle();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let employer = { ...user, role: "employer" };

    dispatch(addEmployer(employer));
    toggle();
  };

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <div className="tabs-container">
          <div className="login-header">
            <div className="header-wrapper" onClick={handleClose}>
              <svg viewBox="0 0 512 512">
                <path d="M280.5 256L495.9 40.5c6.7-6.7 6.7-17.7 0-24.4s-17.7-6.7-24.4 0L256 231.6 40.5 16.1c-6.7-6.7-17.7-6.7-24.4 0s-6.7 17.7 0 24.4L231.6 256 16.1 471.5c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0L256 280.5 471.5 496c6.7 6.7 17.7 6.7 24.4 0s6.7-17.7 0-24.4L280.5 256z"></path>
              </svg>
            </div>
          </div>

          <div className="employer-manager-container">
            <form className="form-container" onSubmit={handleRegister}>
              <label className="employer-manager-label">Name</label>
              <input
                className="form-control"
                type="text"
                placeholder="employer psedo"
                required
                name="name"
                onInput={handleUser}
                value={user.name}
              />
              <label className="employer-manager-label">Password</label>
              <input
                className="form-control"
                type="password"
                required
                placeholder="enter your password"
                min={6}
                name="password"
                onInput={handleUser}
                value={user.password}
              />
              <label className="employer-manager-label">Phone</label>
              <input
                className="form-control"
                type="number"
                placeholder="enter your phone number"
                name="phone"
                onInput={handleUser}
                value={user.phone}
              />
              <input className="form-control" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployer;
