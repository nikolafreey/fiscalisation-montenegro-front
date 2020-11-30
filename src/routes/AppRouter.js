import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  AUTH,
  ERRORS,
} from '../constants/routes';
import AuthRoute from './AuthRoute';
import Login from '../components/auth/Login';
import PasswordRouter from './PasswordRouter';
import SidebarLayout from '../components/layout/sidebar/SidebarLayout';

const AppRouter = () => {
  return (
    <Switch>
      <AuthRoute path={AUTH.LOGIN}>
        <Login />
      </AuthRoute>
      <AuthRoute path={AUTH.PASSWORD}>
        <PasswordRouter />
      </AuthRoute>

      <SidebarLayout/>
      
      <Route path={ERRORS.NOT_FOUND}>Page not found.</Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default AppRouter;
