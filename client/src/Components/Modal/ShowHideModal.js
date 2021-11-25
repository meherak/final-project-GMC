import React from "react";
import AccountModal from "./AccountModal";
import useModal from "./useModal";

const ShowHideModal = () => {
  const { isShowing, toggle } = useModal();

  return (
    <div>
      <div className="Modal-button">
        <button className="button-default" onClick={toggle}>
          Account
        </button>
        <AccountModal isShowing={isShowing} hide={toggle} />
      </div>
    </div>
  );
};

export default ShowHideModal;
