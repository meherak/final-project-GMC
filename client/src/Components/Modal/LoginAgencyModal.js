// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { useDispatch } from "react-redux";
// import { useHistory, useParams } from "react-router";
// // import Agencys from "../Agencys";
// import "./Modal.css";
// import { loginAgency } from "../../JS/actions/agency";

// const LoginAgencyModal = ({ isShowing, toggle }) => {
//   //   const user = useSelector((state) => state.userReducer.user);
//   //   const loadUser = useSelector((state) => state.userReducer.isLoad);
//   //   console.log(user);
//   //   const [agencyToggle, setAgencyToggle] = useState(false);

//   //   let result;

//   // let location = useLocation();
//   const history = useHistory();
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const handleClose = () => {
//     toggle();
//     history.push("/");
//   };
//   const handleChange = (e) => {
//     setPassword(e.target.value);
//   };
//   const { id } = useParams();
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // let id = location.state && location.state.id;
//     console.log(id);
//     dispatch(loginAgency(id, { password }, history));
//     toggle();
//   };
//   let result;
//   if (isShowing) {
//     result = ReactDOM.createPortal(
//       <React.Fragment>
//         <div className="modal-overlay-custom" />
//         <div
//           className="modal-wrapper-custom form"
//           aria-modal
//           aria-hidden
//           tabIndex={-1}
//           role="dialog"
//         >
//           <div className="modal-custom">
//             <div className="modal-header-custom">
//               <div className="title">My Account</div>
//               <button
//                 type="button"
//                 className="modal-close-button-custom"
//                 data-dismiss="modal-custom"
//                 aria-label="Close"
//                 onClick={handleClose}
//               >
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>

//             <div>
//               <form onSubmit={handleSubmit}>
//                 <label>
//                   Enter your password
//                   <input
//                     type="password"
//                     name="password"
//                     onChange={handleChange}
//                   />
//                 </label>
//                 <button type="submit">Submit</button>
//               </form>
//             </div>
//             {/* {loadUser ? (
//               <h3>Stana</h3>
//             ) : user ? (
//               <div className="modal-body">
//                 <div>
//                   <button onClick={() => setAgencyToggle(true)}>
//                     Agency
//                   </button>
//                 </div>
//                 <div>{agencyToggle && <Agencys hide={hide} />}</div>
//               </div>
//             ) : null} */}
//           </div>
//         </div>
//       </React.Fragment>,
//       document.body
//     );
//   } else {
//     result = null;
//   }
//   return result;
// };

// export default LoginAgencyModal;
