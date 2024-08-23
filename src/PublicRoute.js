import React from "react";
import PropTypes from "prop-types"; // Add this import statement
import { Navigate } from "react-router-dom";
import { getSession } from "helper/authHelper";

function PublicRoute({ children }) {
  const userInfo = getSession();

  return !userInfo ? children : <Navigate to="/dashboard" />;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
