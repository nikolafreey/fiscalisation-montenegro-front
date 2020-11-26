import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AUTH, HOME, ERRORS } from '../constants/routes';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path={HOME}>
          Home page
        </Route>
        <AuthRoute path={AUTH.LOGIN}>
          Login
        </AuthRoute>
        <ProtectedRoute path={'/test'}>
          Test protected route
        </ProtectedRoute>
        <Route path={ERRORS.NOT_FOUND}>
          Page not found.
        </Route>
        <Redirect to={ERRORS.NOT_FOUND}/>
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter
