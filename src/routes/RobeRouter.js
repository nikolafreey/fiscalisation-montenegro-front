import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Roba from '../components/Robe/Roba';
import Robe from '../components/Robe/Robe';
import RobeForm from '../components/Robe/RobeForm';
import { ERRORS, ROBE } from '../constants/routes';

const RobeRouter = () => {
  return (
    <Switch>
      <Route path={ROBE.EDIT}>
        <RobeForm />
      </Route>
      <Route path={ROBE.CREATE}>
        <RobeForm />
      </Route>
      <Route path={ROBE.SHOW}>
        <Roba />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default RobeRouter;
