import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Pregled from '../components/Pregled/Pregled';
import {
  ERRORS,
  FIZICKA_LICA,
  HOME,
  PARTNERI,
  PREDUZECA,
  USLUGE,
} from '../constants/routes';
import FizickaLicaRouter from './FizickaLicaRouter';
import PartneriRouter from './PartneriRouter';
import PreduzecaRouter from './PreduzecaRouter';
import ProtectedRoute from './ProtectedRoute';
import UslugeRouter from './UslugeRouter';

const SidebarRouter = () => {
  return (
    <Switch>
      <ProtectedRoute exact path={HOME}>
        <Pregled />
      </ProtectedRoute>
      <ProtectedRoute path={PARTNERI.INDEX}>
        <PartneriRouter />
      </ProtectedRoute>
      <ProtectedRoute path={FIZICKA_LICA.INDEX}>
        <FizickaLicaRouter />
      </ProtectedRoute>
      <ProtectedRoute path={PREDUZECA.INDEX}>
        <PreduzecaRouter />
      </ProtectedRoute>
      <Route path={USLUGE.INDEX}>
        <UslugeRouter />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default SidebarRouter;
