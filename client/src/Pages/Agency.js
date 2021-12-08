import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import LoginAgencyModal from "../Components/Modal/LoginAgencyModal";
// import useModal from "../Components/Modal/useModal";
// import jwt from "jsonwebtoken";
import { useParams } from "react-router";
// import { current } from "../JS/actions/user";
import { currentAgency } from "../JS/actions/agency";
const Agency = ({ location }) => {
  // const { isShowing, toggle } = useModal();
  const agencyLoggedIn = useSelector(
    (state) => state.agencyReducer.agencyLoggedIn
  );
  const loadAgency = useSelector((state) => state.agencyReducer.isLoad);
  // const agency = useSelector((state) => state.agencyReducer.agency);

  const params = useParams();
  const id = params.id;
  // let id = params.id;
  const dispatch = useDispatch();
  // const _id = location.state.id;
  console.log(location);

  useEffect(() => {
    localStorage.setItem("agencyId", id);
    dispatch(currentAgency());
  }, [id]);

  // const { id } = useParams();

  // useEffect(() => {
  //   let token = localStorage.getItem("token");

  //   const decoded = jwt.verify(token, "MYSECRETKEY");

  //   if (id !== decoded._id) {
  //     toggle();
  //   }
  //   // } else {
  //   //   toggle();
  //   // }
  // }, [id]);
  // useEffect(() => {
  //   let token = localStorage.getItem("token");

  //   if (token) {
  //     dispatch(current());
  //     dispatch(currentAgency());
  //   }
  // }, [id]);
  return (
    <div>
      {/* <LoginAgencyModal isShowing={isShowing} toggle={toggle} /> */}
      {loadAgency ? (
        <h3>Stana</h3>
      ) : agencyLoggedIn ? (
        <div>
          <h3>{agencyLoggedIn.agency_name}</h3>
          <h3>{agencyLoggedIn.email}</h3>
        </div>
      ) : null}
    </div>
  );
};

export default Agency;
