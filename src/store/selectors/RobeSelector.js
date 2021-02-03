import { createSelector } from 'reselect';

const robeStateSelector = (state) => state.robeReducer;

export const robeSelector = () =>
  createSelector(robeStateSelector, (robe) => robe.robe);

export const robaSelector = () =>
  createSelector(robeStateSelector, (robe) => robe.roba);
