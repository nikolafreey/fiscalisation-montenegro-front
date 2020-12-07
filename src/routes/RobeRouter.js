import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Roba from '../components/Robe/Roba';
import Robe from '../components/Robe/Robe';
import RobeForm from '../components/Robe/RobeForm';
import { ERRORS, ROBA } from '../constants/routes';

const RobeRouter = () => {
  return (
    <Switch>
      <Route path={ROBA.EDIT}>
        <RobeForm />
      </Route>
      <Route path={ROBA.CREATE}>
        <RobeForm />
      </Route>
      <Route path={ROBA.SHOW}>
        <Roba />
      </Route>
      <Route exact path={ROBA.INDEX}>
        <Robe />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default RobeRouter;
