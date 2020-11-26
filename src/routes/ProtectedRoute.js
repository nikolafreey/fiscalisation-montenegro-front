import React from "react";
import { Redirect, Route } from "react-router-dom";
import { authService } from "../services/AuthService";
import { AUTH } from "../constants/routes";

function ProtectedRoute({ children, ...props }) {
  if (!authService.isAuthenticated()) return <Redirect to={AUTH.LOGIN} />;

  return <Route {...props}>{children}</Route>;
}

export default ProtectedRoute;