import React from "react";
import { Redirect, Route } from "react-router-dom";

import { setToken } from "./utils";

const ProtectedRoute = ({ path, children, ...rest }) => {
  const userTokenDetails = setToken();

  return (
    <Route
      {...rest}
      path={path}
      render={() => {
        if (path !== "/" && !userTokenDetails) {
          return <Redirect to="/" />;
        }
        if (path === "/" && userTokenDetails) {
          return <Redirect to="/buy" />;
        }
        return <>{children}</>;
      }}
    />
  );
};

export default ProtectedRoute;
