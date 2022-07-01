import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostManager from "./Components/posts/PostManager";
import PrivateRoute from "./router/PrivateRoute";
import MyPosts from "./Components/posts/MyPosts";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import Home from "./Pages/home/Home";
import Agency from "./Pages/Agency";
import Error from "./Pages/Error";
import { current as me } from "./JS/actions/user";

import "./App.css";

export const CURRENT_USER = gql`
  query Query {
    current {
      name
      email
    }
  }
`;

function App() {
  const { data } = useQuery(CURRENT_USER);
  const dispatch = useDispatch();
  const { current } = data ?? {};
  useEffect(() => {
    if (current) {
      dispatch(me(current));
    }
    // if (agencyId) {
    //   dispatch(currentAgency());
    // }
  }, [current, dispatch]);

  // useEffect(() => {
  //   if (user && user.role === "business") {
  //     dispatch(myAgencys());
  //   }
  // }, [dispatch, user]);
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/agency/:id" component={Agency} />
        <PrivateRoute
          path={["/addpost", "/editpost"]}
          component={PostManager}
        />
        <PrivateRoute path="/posts" component={MyPosts} />
        <Route path="/*" component={Error} />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
