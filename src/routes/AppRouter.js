import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import FizickaLicaForm from '../components/FizickaLica/FizickaLicaForm';
import PartneriForm from '../components/Partneri/PartneriForm';

import { AUTH, HOME, ERRORS } from '../constants/routes';
import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path={HOME}>
        Home page
      </Route>
      <Route path="/fizicka-lica/edit/:id">
        <FizickaLicaForm />
      </Route>
      <Route path="/partneri/edit/:id">
        <PartneriForm />
      </Route>
      <AuthRoute path={AUTH.LOGIN}>Login</AuthRoute>
      <ProtectedRoute path={'/test'}>Test protected route</ProtectedRoute>
      <Route path={ERRORS.NOT_FOUND}>Page not found.</Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default AppRouter;
