import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const isAuth = useSelector((state) => state.userReducer.isAuth);

  if (!token && !isAuth) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default PrivateRoute;
