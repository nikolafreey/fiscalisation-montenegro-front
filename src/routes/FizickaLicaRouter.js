import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import FizickaLica from '../components/FizickaLica/FizickaLica';
import FizickaLicaForm from '../components/FizickaLica/FizickaLicaForm';
import FizickoLice from '../components/FizickaLica/FizickoLice';
import { ERRORS, FIZICKA_LICA } from '../constants/routes';

const FizickaLicaRouter = () => {
  return (
    <Switch>
      <Route path={FIZICKA_LICA.EDIT}>
        <FizickaLicaForm />
      </Route>
      <Route path={FIZICKA_LICA.CREATE}>
        <FizickaLicaForm />
      </Route>
      <Route path={FIZICKA_LICA.SHOW}>
        <FizickoLice />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND} />
    </Switch>
  );
};

export default FizickaLicaRouter;
