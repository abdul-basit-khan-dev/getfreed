import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element: Component }) => {
  const currentPath = window.location.pathname;

  if (!currentPath || currentPath === "/") {
    return <Navigate to="/record" replace />;
  }

  // Render the component if the path is not empty
  return React.createElement(Component, null);
};

export default PublicRoute;
