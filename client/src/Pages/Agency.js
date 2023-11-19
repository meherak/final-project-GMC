import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import ShowHideModal from "../Components/Modal/ShowHideModal";
import useModal from "../Components/Modal/useModal";
import MyEmployers from "../Components/MyEmployers";
import { currentAgency } from "../JS/actions/agency";
import { myEmployers } from "../JS/actions/employer";

const Agency = ({ location }) => {
  const { isShowing, toggle } = useModal();
  const agencyLoggedIn = useSelector(
    (state) => state.agencyReducer.agencyLoggedIn
  );
  const loadAgency = useSelector((state) => state.agencyReducer.isLoad);
  const employer = useSelector((state) => state.employerReducer.employer);
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("agencyId", id);
    dispatch(currentAgency());
  }, [id, dispatch]);
  useEffect(() => {
    dispatch(myEmployers());
  }, [dispatch, id]);

  return (
    <div>
      {loadAgency ? (
        <h3>Stana</h3>
      ) : agencyLoggedIn ? (
        <div>
          agency
          <h3>{agencyLoggedIn.agency_name}</h3>
          <h3>{agencyLoggedIn.email}</h3>
          <button onClick={() => toggle()}>New employer</button>
          <ShowHideModal
            name="Add employer"
            isShowing={isShowing}
            toggle={toggle}
          />
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
