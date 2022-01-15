import React, { useState } from "react";
import ReactDOM from "react-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import "../login/login.css";

const ConnectionModal = ({ isShowing, toggle }) => {
  const [swich, setSwich] = useState("login");
  const [isActive, setIsActive] = useState({ login: "active", register: "" });
  const handleClose = () => {
    toggle();
  };
  const handleSwich = (name) => {
    setSwich(name);

    setIsActive({ [name]: "active" });
  };
  return (
    isShowing &&
    ReactDOM.createPortal(
      <React.Fragment>
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
              <div className="login-body">
                <ul className="nav nav-pills nav-fill">
                  <li className="nav-item">
                    <button
                      name="login"
                      className={`nav-link ${isActive.login}`}
                      aria-current="page"
                      onClick={(e) => handleSwich(e.target.name)}
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${isActive.register}`}
                      name="register"
                      onClick={(e) => handleSwich(e.target.name)}
                    >
                      Register
                    </button>
                  </li>
                </ul>
              </div>
              <div className="login-body">
                {swich === "login" ? (
                  <Login setIsActive={setIsActive} toggle={toggle} />
                ) : (
                  swich === "register" && (
                    <Register setIsActive={setIsActive} toggle={toggle} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>,
      document.body
    )
  );
};

export default ConnectionModal;
