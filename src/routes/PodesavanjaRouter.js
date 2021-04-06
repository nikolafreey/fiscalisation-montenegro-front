import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { ERRORS, MODULI, PODESAVANJA } from '../constants/routes';
import Moduli from '../components/Moduli/Moduli';
import Podesavanja from '../components/Podesavanja/Podesavanja';

const PodesavanjaRouter = () => {
  return (
    <Switch>
      <Route exact path={PODESAVANJA.INDEX}>
        <Podesavanja />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default PodesavanjaRouter;
