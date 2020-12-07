import { createSelector } from 'reselect';

const uslugeStateSelector = (state) => state.uslugeReducer;

export const uslugeSelector = () =>
  createSelector(uslugeStateSelector, (usluge) => usluge.usluge);

export const uslugaSelector = () =>
  createSelector(uslugeStateSelector, (usluge) => usluge.usluga);

export const poreziSelector = () =>
  createSelector(uslugeStateSelector, (usluge) => usluge.porezi);

export const poreziDropdownSelector = () =>
  createSelector(uslugeStateSelector, (usluge) =>
    usluge.porezi.map((porez) => ({ value: porez.id, label: porez.naziv }))
  );

export const porezIdSelector = (id) =>
  createSelector(uslugeStateSelector, (usluge) =>
    usluge.porezi.find((porez) => porez.id === id)
  );
