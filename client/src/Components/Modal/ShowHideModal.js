import React from "react";
import AccountModal from "./AccountModal";
import EmployerManager from "./EmployerManager";
import useModal from "./useModal";

const ShowHideModal = ({ name }) => {
  const { isShowing, toggle } = useModal();

  return (
    <div>
      <div className="Modal-button">
        <button className="button-default" onClick={toggle}>
          {name}
        </button>
        <div>
          {name === "Account" ? (
            <AccountModal isShowing={isShowing} hide={toggle} />
          ) : name === "Add employer" ? (
            <EmployerManager isShowing={isShowing} hide={toggle} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ShowHideModal;
