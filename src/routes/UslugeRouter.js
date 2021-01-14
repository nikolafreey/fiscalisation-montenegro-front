import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Usluga from '../components/Usluge/Usluga';
import Usluge from '../components/Usluge/Usluge';
import UslugeForm from '../components/Usluge/UslugeForm';
import { ERRORS, USLUGE } from '../constants/routes';

const UslugeRouter = () => {
  return (
    <Switch>
      <Route path={USLUGE.EDIT}>
        <UslugeForm />
      </Route>
      <Route path={USLUGE.CREATE}>
        <UslugeForm />
      </Route>
      <Route path={USLUGE.SHOW}>
        <Usluga />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default UslugeRouter;
