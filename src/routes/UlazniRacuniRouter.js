import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ERRORS, ULAZNI_RACUNI } from '../constants/routes';
import UlazniRacuni from '../components/UlazniRacuni/UlazniRacuni';

const UlazniRacuniRouter = () => {
  return (
    <Switch>
      <Route path={ULAZNI_RACUNI.EDIT}>{/* <UlazniRacuniForm /> */}</Route>
      <Route path={ULAZNI_RACUNI.CREATE}>{/* <UlazniRacuniForm /> */}</Route>
      <Route path={ULAZNI_RACUNI.SHOW}>{/* <UlazniRacun /> */}</Route>
      <Route exact path={ULAZNI_RACUNI.INDEX}>
        <UlazniRacuni />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default UlazniRacuniRouter;
