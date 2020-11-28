import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Partner from '../components/Partneri/Partner';
import Partneri from '../components/Partneri/Partneri';
import PartneriForm from '../components/Partneri/PartneriForm';
import { ERRORS, PARTNERI } from '../constants/routes';

const PartneriRouter = () => {
  return (
    <Switch>
      <Route path={PARTNERI.EDIT}>
        <PartneriForm />
      </Route>
      <Route path={PARTNERI.CREATE}>
        <PartneriForm />
      </Route>
      <Route path={PARTNERI.SHOW}>
        <Partner />
      </Route>
      <Route exact path={PARTNERI.INDEX}>
        <Partneri />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default PartneriRouter;
