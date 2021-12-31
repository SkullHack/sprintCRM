import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export const showLoading = () => (
  <Fragment>
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </Fragment>
);
