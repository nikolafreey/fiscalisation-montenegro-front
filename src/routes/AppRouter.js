import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  AUTH,
  HOME,
  ERRORS,
  FIZICKA_LICA,
  PREDUZECA,
} from '../constants/routes';
import Login from '../components/auth/Login';
import Home from '../components/Home';
import AuthRoute from './AuthRoute';
import FizickaLicaRouter from './FizickaLicaRouter';
import PreduzecaRouter from './PreduzecaRouter';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={HOME}>
        <Home />
      </Route>
      <ProtectedRoute path={FIZICKA_LICA.INDEX}>
        <FizickaLicaRouter />
      </ProtectedRoute>
      <ProtectedRoute path={PREDUZECA.INDEX}>
        <PreduzecaRouter />
      </ProtectedRoute>
      <AuthRoute path={AUTH.LOGIN}>
        <Login />
      </AuthRoute>
      <ProtectedRoute path={'/test'}>Test protected route</ProtectedRoute>
      <Route path={ERRORS.NOT_FOUND}>Page not found.</Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default AppRouter;
