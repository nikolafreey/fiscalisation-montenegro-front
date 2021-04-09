import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { authService } from '../services/AuthService';
import { HOME } from '../constants/routes';

function AuthRoute({ children, ...props }) {
  if (authService.isAuthenticated()) return <Redirect to={HOME} />;

  return <Route {...props}>{children}</Route>;
}

export default AuthRoute;
