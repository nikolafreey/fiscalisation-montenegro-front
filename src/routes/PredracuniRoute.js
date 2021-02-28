import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ERRORS, PREDRACUNI } from '../constants/routes';
import Predracun from '../components/Predracuni/Predracun';
import Predracuni from '../components/Predracuni/Predracuni';
import PredracuniForm from '../components/Predracuni/PredracuniForm';

const PredracuniRouter = () => {
  return (
    <Switch>
      <Route path={PREDRACUNI.EDIT}>
        <PredracuniForm />
      </Route>
      <Route path={PREDRACUNI.CREATE}>
        <PredracuniForm />
      </Route>
      <Route path={PREDRACUNI.SHOW}>
        <Predracun />
      </Route>
      <Route exact path={PREDRACUNI.INDEX}>
        <Predracuni />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default PredracuniRouter;
