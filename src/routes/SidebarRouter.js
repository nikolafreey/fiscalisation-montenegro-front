import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Pregled from '../components/Pregled/Pregled';
import {
  ERRORS,
  FIZICKA_LICA,
  HOME,
  PARTNERI,
  PREDRACUNI,
  PREDUZECA,
  RACUNI,
  ROBE,
  ULAZNI_RACUNI,
  USLUGE,
  STAVKE
} from '../constants/routes';
import FizickaLicaRouter from './FizickaLicaRouter';
import PartneriRouter from './PartneriRouter';
import PreduzecaRouter from './PreduzecaRouter';
import ProtectedRoute from './ProtectedRoute';
import StavkeRouter from './StavkeRouter';
import UslugeRouter from './UslugeRouter';
import RobeRouter from './RobeRouter';
import RacuniRouter from './RacuniRouter';
import PredracuniRouter from './PredracuniRoute';
import UlazniRacuniRouter from './UlazniRacuniRouter';

const SidebarRouter = () => {
  return (
    <div className="screen-content-info">
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
        <ProtectedRoute path={RACUNI.INDEX}>
          <RacuniRouter />
        </ProtectedRoute>
        <ProtectedRoute path={PREDRACUNI.INDEX}>
          <PredracuniRouter />
        </ProtectedRoute>
        <ProtectedRoute path={ULAZNI_RACUNI.INDEX}>
          <UlazniRacuniRouter />
        </ProtectedRoute>
        <ProtectedRoute path={PREDUZECA.INDEX}>
          <PreduzecaRouter />
        </ProtectedRoute>
        <ProtectedRoute path={STAVKE.INDEX}>
          <StavkeRouter />
        </ProtectedRoute>
        <ProtectedRoute path={ROBE.INDEX}>
          <RobeRouter />
        </ProtectedRoute>
        <ProtectedRoute path={USLUGE.INDEX}>
          <UslugeRouter />
        </ProtectedRoute>
        <Redirect to={ERRORS.NOT_FOUND} />
      </Switch>
    </div>
  );
};

export default SidebarRouter;
