import React from "react";
import AccountModal from "./AccountModal";
import ConnectionModal from "./ConnectionModal";
import EmployerManager from "./EmployerManager";

const ShowHideModal = ({ name, isShowing, toggle }) => {
  console.log(name);
  return (
    <div>
      {/* <div className="Modal-button">
        <i className="fas fa-sign-in-alt" onClick={toggle}> */}
      {/* <button
            className="nav-link active"
            aria-current="page"
            onClick={toggle}
          > */}
      {/* {name} */}
      {/* </button> */}
      {/* </i> */}
      {/* <i className="fas fa-sign-in-alt">
          <button className="nav-link active" aria-current="page" href="/login">
            Connection
          </button>
        </i> */}
      {/* </div> */}
      <div>
        {name === "Account" ? (
          <AccountModal isShowing={isShowing} toggle={toggle} />
        ) : name === "Add employer" ? (
          <EmployerManager isShowing={isShowing} toggle={toggle} />
        ) : (
          name === "Connection" && (
            <ConnectionModal isShowing={isShowing} toggle={toggle} />
          )
        )}
      </div>
    </div>
  );
};

export default ShowHideModal;
