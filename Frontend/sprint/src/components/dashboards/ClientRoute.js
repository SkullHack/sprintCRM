import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isClientAuthenticated } from "../../helpers/auth";

const ClientRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isClientAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/client/ClientLogin" />
        )
      }
    />
  );
};

export default ClientRoute;
