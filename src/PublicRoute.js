import React from "react";
import PropTypes from "prop-types"; // Add this import statement
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("authUser"));

  return !userInfo ? children : <Navigate to="/dashboard" />;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
