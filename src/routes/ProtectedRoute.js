import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { authService } from "../services/AuthService";
import { AUTH } from "../constants/routes";
import { useDispatch } from "react-redux";
import { setRequestedRoute } from '../store/actions/RouteActions';

function ProtectedRoute({ children, ...props }) {
  const dispatch = useDispatch();

  const location = useLocation();

  if (!authService.isAuthenticated()) {
    dispatch(setRequestedRoute(location));
    return <Redirect to={AUTH.LOGIN} />
  };

  return <Route {...props}>{children}</Route>;
}

export default ProtectedRoute;