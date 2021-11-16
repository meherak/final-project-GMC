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
import AddPost from "./Pages/Posts/AddPost";
import Myposts from "./Pages/Posts/Myposts";
import Profile from "./Pages/Profile";
import PrivateRoute from "./router/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) dispatch(current());
  }, [dispatch, token]);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/addpost" component={AddPost} />
        <PrivateRoute path="/myposts" component={Myposts} />
        <PrivateRoute path="/editpost" component={AddPost} />
        <Route path="/*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
