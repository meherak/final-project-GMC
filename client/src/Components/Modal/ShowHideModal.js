import React from "react";
import AccountModal from "./AccountModal";
import ConnectionModal from "./ConnectionModal";
import EmployerManager from "./EmployerManager";

const ShowHideModal = ({ name, isShowing, toggle }) => {
  return (
    <div>
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
