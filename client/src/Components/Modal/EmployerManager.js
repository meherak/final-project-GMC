import React from "react";
import AddEmployer from "../AddEmployer";
import ReactDOM from "react-dom";

const EmployerManager = ({ isShowing, toggle }) => {
  return (
    isShowing &&
    ReactDOM.createPortal(
      <React.Fragment>
        <div>
          <AddEmployer isShowing={isShowing} toggle={toggle} />
        </div>
      </React.Fragment>,
      document.body
    )
  );
};

export default EmployerManager;
