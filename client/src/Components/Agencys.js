import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { myAgencys } from "../JS/actions/agency";
import AddAgency from "./AddAgency";

const Agencys = ({ toggle, setAgencyToggle, agencyToggle }) => {
  const [addAgency, setAddAgency] = useState(false);

  const agency = useSelector((state) => state.agencyReducer.agency);

  const dispatch = useDispatch();

  useEffect(() => {
    agencyToggle && dispatch(myAgencys());
  }, [dispatch, agencyToggle]);

  return (
    <div>
      <button onClick={() => setAddAgency(false)}>My Agencys</button>
      <button onClick={() => setAddAgency(true)}>Add Agency</button>
      <div>
        {addAgency ? (
          <AddAgency setAddAgency={setAddAgency} />
        ) : (
          <div>
            {agency &&
              agency.map((e) => (
                <Link
                  to={{ pathname: `/agency/${e._id}`, state: String(e._id) }}
                  key={Math.random()}
                  onClick={() => {
                    toggle();
                    setAgencyToggle(false);
                  }}
                >
                  {e.agency_name}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agencys;
