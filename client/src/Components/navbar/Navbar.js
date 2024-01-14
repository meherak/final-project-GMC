import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../JS/actions/user";

import ShowHideModal from "../Modal/ShowHideModal";
import useModal from "../Modal/useModal";
import "./navbar.css";



export default function Navbar() {
  const [modalShouldShow, setModalShouldShow] = useState("");
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const { isShowing, toggle } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleClickModal = (e) => {
    toggle();
    setModalShouldShow(e.target.name);
  };

  return (
    <nav className="navbar navbar-light">
      <ShowHideModal
        name={modalShouldShow}
        isShowing={isShowing}
        toggle={toggle}
      />

      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          SE LOGER
        </Link>
        {isAuth ? (
          <div className="navbar-nav d-flex flex-row">
            <button
              className="nav-item mr-2 btn-navbar"
              label="New Post"
              onClick={() => navigate("/addpost")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                className="bi bi-plus-square"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="span-navbar">New post</span>
            </button>
            <button
              className="nav-item mr-2 btn-navbar"
              label="My Posts"
              // color="light"
              onClick={() => navigate("/posts")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                className="bi bi-kanban"
                viewBox="0 0 16 16"
              >
                <path d="M13.5 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h11zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11z" />
                <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3z" />
              </svg>
              <span className="span-navbar">My posts</span>
            </button>
            <button
              className="nav-item mr-2 btn-navbar"
              label="Account"
              name="Account"
              onClick={(e) => handleClickModal(e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              <span className="span-navbar" name="Account">
                Account
              </span>
            </button>

            <button
              className="nav-item mr-2 btn-navbar"
              label="Logout"
              color="danger"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="currentColor"
                className="bi bi-door-closed"
                viewBox="0 0 16 16"
              >
                <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
                <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
              </svg>
              <span className="span-navbar">Signout</span>
            </button>
          </div>
        ) : (
          <div className="navbar-nav d-flex flex-row">
            <div name="Connection" onClick={(e) => handleClickModal(e)}>
              <button
                className="nav-item mr-2 btn-navbar"
                label="Connection"
                name="Connection"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={32}
                  height={32}
                  fill="currentColor"
                  className="bi bi-door-open"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                  <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                </svg>
                <span className="css-1rsw1pf span-navbar">Connection</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
