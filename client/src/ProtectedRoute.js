import React from "react";
import { Redirect, Route } from "react-router-dom";

import { retrieveToken } from "./utils";

const ProtectedRoute = ({ path, children, ...rest }) => {
  const userTokenDetails = JSON.parse(retrieveToken());

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
