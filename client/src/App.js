import "./App.css";
import Error from "./Pages/Error";
import { useEffect } from "react";
import Agency from "./Pages/Agency";
import Home from "./Pages/home/Home";
import { current } from "./JS/actions/user";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./router/PrivateRoute";
import MyPosts from "./Components/posts/MyPosts";
import { useDispatch, useSelector } from "react-redux";
import PostManager from "./Components/posts/PostManager";
import { currentAgency, myAgencys } from "./JS/actions/agency";

function App() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const agencyId = localStorage.getItem("agencyId");

  useEffect(() => {
    if (token) {
      dispatch(current());
    }
    if (agencyId) {
      dispatch(currentAgency());
    }
  }, [dispatch, token, agencyId]);
  console.log(user);
  useEffect(() => {
    if (user && user.role === "business") {
      dispatch(myAgencys());
    }
  }, [dispatch, user]);
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
