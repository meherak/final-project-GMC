import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ShowHideModal from "../Components/Modal/ShowHideModal";
import MyEmployers from "../Components/MyEmployers";
import { currentAgency } from "../JS/actions/agency";
import { myEmployers } from "../JS/actions/employer";

const Agency = ({ location }) => {
  // const { isShowing, toggle } = useModal();
  const [showForm, setShowForm] = useState(false);
  const agencyLoggedIn = useSelector(
    (state) => state.agencyReducer.agencyLoggedIn
  );
  const loadAgency = useSelector((state) => state.agencyReducer.isLoad);
  // const agency = useSelector((state) => state.agencyReducer.agency);
  const employer = useSelector((state) => state.employerReducer.employer);
  const params = useParams();
  const id = params.id;
  // let id = params.id;
  const dispatch = useDispatch();
  // const _id = location.state.id;
  console.log(location);

  useEffect(() => {
    localStorage.setItem("agencyId", id);
    dispatch(currentAgency());
  }, [id, dispatch]);
  useEffect(() => {
    dispatch(myEmployers());
  }, [dispatch, id]);

  return (
    <div>
      {/* <LoginAgencyModal isShowing={isShowing} toggle={toggle} /> */}
      {loadAgency ? (
        <h3>Stana</h3>
      ) : agencyLoggedIn ? (
        <div>
          <h3>{agencyLoggedIn.agency_name}</h3>
          <h3>{agencyLoggedIn.email}</h3>
          <ShowHideModal name="Add employer" />
          <div>
            {employer.map((e, i) => (
              <MyEmployers key={i} employer={e} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Agency;
