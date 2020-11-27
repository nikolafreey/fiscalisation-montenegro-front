import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import FizickaLicaDetails from '../components/FizickaLica/FizickaLicaDetails'
import FizickaLicaForm from '../components/FizickaLica/FizickaLicaForm'
import FizickaLicaTable from '../components/FizickaLica/FizickaLicaTable'
import { ERRORS, FIZICKA_LICA } from '../constants/routes'

const FizickaLicaRouter = () => {
  return (
    <Switch>
      <Route path={FIZICKA_LICA.EDIT}>
        <FizickaLicaForm/>
      </Route>
      <Route path={FIZICKA_LICA.CREATE}>
        <FizickaLicaForm/>
      </Route>
      <Route path={FIZICKA_LICA.SHOW}>
        <FizickaLicaDetails/>
      </Route>
      <Route exact path={FIZICKA_LICA.INDEX}>
        <FizickaLicaTable />
      </Route>
      <Redirect to={ERRORS.NOT_FOUND}/>
    </Switch>
  )
}

export default FizickaLicaRouter
