import { createSelector } from 'reselect';

const fizickaLicaStateSelector = state => state.fizickaLicaReducer;

export const fizickaLicaSelector = () =>
  createSelector(fizickaLicaStateSelector, fizicka_lica => fizicka_lica.fizicka_lica);

  export const fizickoLiceSelector = () =>
  createSelector(fizickaLicaStateSelector, fizicka_lica => fizicka_lica.fizicko_lice);