import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Pregled from '../components/Pregled/Pregled';
import {
  ERRORS,
  FIZICKA_LICA,
  HOME,
  PARTNERI,
  PREDUZECA,
  ROBE,
  USLUGE,
} from '../constants/routes';
import FizickaLicaRouter from './FizickaLicaRouter';
import PartneriRouter from './PartneriRouter';
import PreduzecaRouter from './PreduzecaRouter';
import ProtectedRoute from './ProtectedRoute';
import UslugeRouter from './UslugeRouter';
import RobeRouter from './RobeRouter';

const SidebarRouter = () => {
  return (
    <div class="screen-content-info">
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
        <ProtectedRoute path={ROBE.INDEX}>
          <RobeRouter />
        </ProtectedRoute>
        <Route path={USLUGE.INDEX}>
          <UslugeRouter />
        </Route>
        <Redirect to={ERRORS.NOT_FOUND} />
      </Switch>
    </div>
  );
};

export default SidebarRouter;
