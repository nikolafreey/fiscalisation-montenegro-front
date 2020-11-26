import { createSelector } from 'reselect';

const partneriStateSelector = (state) => state.partneriReducer;

export const partneriSelector = () =>
  createSelector(partneriStateSelector, (partneri) => partneri.partneri);
