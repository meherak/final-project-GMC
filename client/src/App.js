import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import { current } from "./JS/actions/user";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Myposts from "./Pages/Posts/Myposts";
import PostManager from "./Pages/Posts/PostManager";
import Agency from "./Pages/Agency";
import PrivateRoute from "./router/PrivateRoute";
import { currentAgency } from "./JS/actions/agency";

function App() {
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

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/agency/:id" component={Agency} />
        <PrivateRoute
          path={["/addpost", "/editpost"]}
          component={PostManager}
        />
        <PrivateRoute path="/myposts" component={Myposts} />
        <Route path="/*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
