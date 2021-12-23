import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
// import { currentAgency } from "../../JS/actions/agency";
import { current } from "../../JS/actions/user";
import Agencys from "../Agencys";
import "./Modal.css";

const AccountModal = ({ isShowing, hide }) => {
  const [agencyToggle, setAgencyToggle] = useState(false);

  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.isLoad);
  const loadAgency = useSelector((state) => state.agencyReducer.agencyLoggedIn);
  const agencyLoggedIn = useSelector(
    (state) => state.agencyReducer.agencyLoggedIn
  );

  // console.log(agencyLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  return (
    isShowing &&
    ReactDOM.createPortal(
      <React.Fragment>
        <div className="modal-overlay-custom" />
        <div
          className="modal-wrapper-custom form"
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-custom">
            <div className="modal-header-custom">
              <div className="title">My Account</div>
              <button
                type="button"
                className="modal-close-button-custom"
                data-dismiss="modal-custom"
                aria-label="Close"
                onClick={hide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {loadUser ? (
              <h3>Stana</h3>
            ) : user ? (
              <div className="modal-body">
                {user && user.role === "business" ? (
                  <div>
                    <button onClick={() => setAgencyToggle(true)}>
                      Agency
                    </button>
                  </div>
                ) : null}
                <div>
                  {agencyToggle ? (
                    <Agencys
                      hide={hide}
                      setAgencyToggle={setAgencyToggle}
                      agencyToggle={agencyToggle}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>,
      document.body
    )
  );
};

export default AccountModal;
