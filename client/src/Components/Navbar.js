import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../JS/actions/user";
import "./Navbar.css";
import ShowHideModal from "./Modal/ShowHideModal";

export default function Navbar() {
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "#490b72", color: "#e0d7e6" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, color: "yellow" }}
          >
            l mouhem MANEGLGOUCH
          </Typography>
          <div>
            <Button>
              <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                Home
              </Link>
            </Button>

            {isAuth ? (
              <div>
                <Button
                  onClick={handleLogout}
                  color="inherit"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  logout
                </Button>
                <Button>
                  <Link
                    to="/myposts"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    My Posts
                  </Link>
                </Button>
                {/* <Button>
                  <Link
                    to="/Profile"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Profile
                  </Link>
                </Button> */}
                <Button>
                  <Link
                    to="/addpost"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Add Post
                  </Link>
                </Button>
                <ShowHideModal />
              </div>
            ) : (
              <div>
                <Button>
                  <Link
                    to="/register"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Register
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link
                    to="/login"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
