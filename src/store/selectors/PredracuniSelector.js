import { createSelector } from 'reselect';

const predracuniStateSelector = (state) => state.predracuniReducer;

export const predracuniSelector = () =>
  createSelector(
    predracuniStateSelector,
    (predracuni) => predracuni.predracuni
  );

export const predracunSelector = () =>
  createSelector(predracuniStateSelector, (predracun) => predracun.predracuni);
