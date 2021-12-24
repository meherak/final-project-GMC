import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import { current } from "./JS/actions/user";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import Error from "./Pages/Error";
import Home from "./Pages/Home";

import Posts from "./Components/posts/Posts";
import PostManager from "./Components/posts/PostManager";

import Agency from "./Pages/Agency";
import PrivateRoute from "./router/PrivateRoute";
import { currentAgency } from "./JS/actions/agency";

function App() {
  // const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const agencyId = localStorage.getItem("agencyId");
  // let id;
  // if (user && user.id_agency) {
  //   id = user.id_agency;
  // }
  // useEffect(() => {
  //   if (id) {
  //     localStorage.setItem("agencyId", id);
  //   }
  // }, [user.id_agency]);

  useEffect(() => {
    if (token) {
      dispatch(current());
    }
    if (agencyId) {
      dispatch(currentAgency());
    }
  }, [dispatch, token, agencyId]);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        {/* <div className="container"> */}
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/agency/:id" component={Agency} />
          <PrivateRoute
            path={["/addpost", "/editpost"]}
            component={PostManager}
          />
          <PrivateRoute path="/posts" component={Posts} />
          <Route path="/*" component={Error} />
        {/* </div> */}
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
