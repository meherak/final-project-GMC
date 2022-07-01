import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { AUTH_TOKEN } from "../constants";
import { CURRENT_USER } from "../App";

const PrivateRoute = ({ component, ...rest }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const { data } = useQuery(CURRENT_USER);
  const { current } = data ?? {};

  if (!token && !current) {
    return <Redirect to="/" />;
  } else {
    return <Route {...rest} component={component} />;
  }
};

export default PrivateRoute;
