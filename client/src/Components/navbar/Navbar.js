import * as React from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../JS/actions/user";
// import ShowHideModal from "../Modal/ShowHideModal";
import "./navbar.css";

import Button from '../button/Button';

export default function Navbar() {
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">GO MY CODE</a>
        {isAuth ? (
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item mr-2">
              <Button label="New Post" color="light" clickHandler={() => history.push('/addpost')} />
              {/* <button className="btn btn-light" onClick={() => history.push('/addpost')}>New Post</button> */}
            </li>
            <li className="nav-item mr-2">
              <Button label="My Posts" color="light" clickHandler={() => history.push('/posts')} />
              {/* <button className="btn btn-light" onClick={() => history.push('/posts')}>My Posts</button> */}
            </li>
            <li className="nav-item mr-2">
              <Button label="Logout" color="danger" clickHandler={handleLogout} />
              {/* <button className="btn btn-danger" onClick={handleLogout}>Logout</button> */}
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item mr-2">
              <a className="nav-link active" aria-current="page" href="/login">Login</a>
            </li>
            <li className="nav-item mr-2">
              <a className="nav-link active" aria-current="page" href="/register">Register</a>
            </li>
          </ul>
        )}

      </div >
    </nav >
  );
  // <Box sx={{ flexGrow: 1 }}>
  //   <AppBar
  //     position="static"
  //     style={{ backgroundColor: "#490b72", color: "#e0d7e6" }}
  //   >
  //     <Toolbar>
  //       <Typography
  //         variant="h5"
  //         component="div"
  //         sx={{ flexGrow: 1, color: "yellow" }}
  //       >
  //         l mouhem MANEGLGOUCH
  //       </Typography>
  //       <div>
  //         <Button>
  //           <Link to="/" style={{ color: "black", textDecoration: "none" }}>
  //             Home
  //           </Link>
  //         </Button>

  //         {isAuth ? (
  //           <div>
  //             <Button
  //               onClick={handleLogout}
  //               color="inherit"
  //               style={{ color: "black", textDecoration: "none" }}
  //             >
  //               logout
  //             </Button>
  //             <Button>
  //               <Link
  //                 to="/myposts"
  //                 style={{ color: "black", textDecoration: "none" }}
  //               >
  //                 My Posts
  //               </Link>
  //             </Button>
  //             {/* <Button>
  //               <Link
  //                 to="/Agency"
  //                 style={{ color: "black", textDecoration: "none" }}
  //               >
  //                 Agency
  //               </Link>
  //             </Button> */}
  //             <Button>
  //               <Link
  //                 to="/addpost"
  //                 style={{ color: "black", textDecoration: "none" }}
  //               >
  //                 Add Post
  //               </Link>
  //             </Button>
  //             <ShowHideModal name="Account" />
  //           </div>
  //         ) : (
  //           <div>
  //             <Button>
  //               <Link
  //                 to="/register"
  //                 style={{ color: "black", textDecoration: "none" }}
  //               >
  //                 Register
  //               </Link>
  //             </Button>
  //             <Button color="inherit">
  //               <Link
  //                 to="/login"
  //                 style={{ color: "black", textDecoration: "none" }}
  //               >
  //                 Login
  //               </Link>
  //             </Button>
  //           </div>
  //         )}
  //       </div>
  //     </Toolbar>
  //   </AppBar>
  // </Box>
  // );
}
