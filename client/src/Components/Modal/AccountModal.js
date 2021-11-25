import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import Profiles from "../Profiles";
import "./Modal.css";

const AccountModal = ({ isShowing, hide }) => {
  const user = useSelector((state) => state.userReducer.user);
  const loadUser = useSelector((state) => state.userReducer.isLoad);
  console.log(user);
  const [profileToggle, setProfileToggle] = useState(false);

  let result;
  if (isShowing) {
    result = ReactDOM.createPortal(
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
                <div>
                  <button onClick={() => setProfileToggle(true)}>
                    Profile
                  </button>
                </div>
                <div>{profileToggle && <Profiles hide={hide} />}</div>
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>,
      document.body
    );
  } else {
    result = null;
  }
  return result;
};

export default AccountModal;
