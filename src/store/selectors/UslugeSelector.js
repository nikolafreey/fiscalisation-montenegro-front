import { createSelector } from 'reselect';

const uslugeStateSelector = (state) => state.uslugeReducer;

export const uslugeSelector = () =>
  createSelector(uslugeStateSelector, (usluge) => usluge.usluge);

export const uslugaSelector = () =>
  createSelector(uslugeStateSelector, (usluge) => usluge.usluga);
