import { createSelector } from 'reselect';

const robeStateSelector = (state) => state.robeReducer;

export const robeSelector = () =>
  createSelector(robeStateSelector, (roba) => roba.roba);

export const robaSelector = () =>
  createSelector(robeStateSelector, (robe) => robe.roba);
