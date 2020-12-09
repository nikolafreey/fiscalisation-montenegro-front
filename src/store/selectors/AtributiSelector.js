import { createSelector } from 'reselect';

const atributiStateSelector = (state) => state.atributiReducer;

export const atributiSelector = () =>
  createSelector(atributiStateSelector, (atributi) => atributi.atributi);

export const tipoviAtributaSelector = () =>
  createSelector(atributiStateSelector, (atributi) => atributi.tipovi_atributa);

export const tipAtributaSelector = () =>
  createSelector(atributiStateSelector, (atributi) => atributi.tip_atributa);

