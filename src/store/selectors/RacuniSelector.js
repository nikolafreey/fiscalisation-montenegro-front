import { createSelector } from 'reselect';

const racuniStateSelector = (state) => state.racuniReducer;

export const racuniSelector = () =>
  createSelector(racuniStateSelector, (racuni) => racuni.racuni);

export const racunSelector = () =>
  createSelector(racuniStateSelector, (racun) => racun.racuni);
