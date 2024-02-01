import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element: Component }) => {
  const currentPath = window.location.pathname;

  if (!currentPath || currentPath === "/") {
    return <Navigate to="/record" replace />;
  }

  return React.createElement(Component, null);
};

export default PublicRoute;
