import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../JS/actions/user";
export default function Navbar() {
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <div>
            <Button>
              <Link to="/">Home</Link>
            </Button>

            {isAuth ? (
              <Button
                onClick={handleLogout}
                color="primary"
                style={{ color: "black" }}
              >
                logout
              </Button>
            ) : (
              <div>
                {" "}
                <Button>
                  <Link to="/register">Register</Link>
                </Button>
                <Button color="inherit">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
