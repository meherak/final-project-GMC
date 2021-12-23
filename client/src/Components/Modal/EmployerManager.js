import React from "react";
import AddEmployer from "../AddEmployer";
import ReactDOM from "react-dom";

const EmployerManager = ({ isShowing, hide }) => {
  return (
    isShowing &&
    ReactDOM.createPortal(
      <React.Fragment>
        <div>
          <AddEmployer isShowing={isShowing} hide={hide} />
        </div>
      </React.Fragment>,
      document.body
    )
  );
};

export default EmployerManager;
