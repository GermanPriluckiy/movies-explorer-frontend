import React from "react";
import { Navigate } from "react-router-dom";
import Wrapper from "./Wrapper/Wrapper";

export const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.loggedIn ? (<Component {...props} />) : (<Navigate to="/signin" />);
};
