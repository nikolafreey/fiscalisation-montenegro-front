import { createSelector } from 'reselect';

const kategorijeRobeStateSelector = (state) => state.kategorijeRobeReducer;

export const kategorijeRobeSelector = () =>
  createSelector(kategorijeRobeStateSelector, (kategorijeRobe) => kategorijeRobe.kategorijeRobe);

 export const podkategorijeRobeSelector = () =>
  createSelector(kategorijeRobeStateSelector, (kategorijeRobe) => kategorijeRobe.podkategorijeRobe);

