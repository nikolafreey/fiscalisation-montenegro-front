import { createSelector } from 'reselect';

const buyerStateSelector = state => state.buyerReducer;

export const buyerSelector = () =>
  createSelector(buyerStateSelector, buyers => buyers.buyers);