import { createSelector } from 'reselect';

const preduzecaStateSelector = (state) => state.preduzecaReducer;

export const preduzecaSelector = () =>
  createSelector(preduzecaStateSelector, (preduzeca) => preduzeca.preduzeca);

export const preduzeceSelector = () =>
  createSelector(preduzecaStateSelector, (preduzeca) => preduzeca.preduzece);
