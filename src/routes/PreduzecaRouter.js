import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PreduzecaForm from '../components/Preduzeca/PreduzecaForm';
import Preduzece from '../components/Preduzeca/Preduzece';
import Preduzeca from '../components/Preduzeca/Preduzeca';
import { ERRORS, PREDUZECA } from '../constants/routes';

const PreduzecaRouter = () => {
  return (
    <Switch>
      <Route path={PREDUZECA.EDIT}>
        <PreduzecaForm />
      </Route>
      <Route path={PREDUZECA.CREATE}>
        <PreduzecaForm />
      </Route>
      <Route exact path={PREDUZECA.PARTNERI}>
        <Preduzeca />
      </Route>
      <Route path={PREDUZECA.SHOW}>
        <Preduzece />
      </Route>
      <Route exact path={PREDUZECA.INDEX}>
        <Preduzeca />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default PreduzecaRouter;
