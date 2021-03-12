import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ERRORS, MODULI } from '../constants/routes';
import Moduli from '../components/Moduli/Moduli';

const ModuliRouter = () => {
  return (
    <Switch>     
      <Route exact path={MODULI.INDEX}>
        <Moduli />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default ModuliRouter;
