import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import Usluga from '../components/Usluge/Usluga';
import Stavke from '../components/Stavke/Stavke';
import UslugeForm from '../components/Usluge/UslugeForm';
import RobeForm from '../components/Robe/RobeForm';

import { ERRORS, STAVKE } from '../constants/routes';


// EDIT_USLUGE: '/stavke/usluge/edit/:id',
// EDIT_ROBE: '/stavke/robe/edit/:id',
// CREATE_USLUGE: '/usluge/create',
// CREATE_ROBE: '/usluge/create',

const UslugeRouter = () => {
  return (
    <Switch>
      <Route path={STAVKE.CREATE_USLUGE}>
        <UslugeForm />
      </Route>
      <Route path={STAVKE.CREATE_ROBE}>
        <RobeForm />
      </Route>
      <Route path={STAVKE.EDIT_USLUGE}>
        <UslugeForm />
      </Route>
      <Route path={STAVKE.EDIT_ROBE}>
        <RobeForm />
      </Route>
       <Route path={STAVKE.INDEX}>
        <Stavke />
      </Route>

     {/* <Route path={USLUGE.SHOW}>
        <Usluga />
      </Route> */}
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default UslugeRouter;
