import { createSelector } from 'reselect';

const racuniStateSelector = (state) => state.racuniSelector;

export const racuniSelector = () =>
  createSelector(racuniStateSelector, (racuni) => racuni.racuni);

export const racunSelector = () =>
  createSelector(racuniStateSelector, (racuni) => racuni.racun);

export const poreziSelector = () =>
  createSelector(racuniStateSelector, (racuni) => racuni.porezi);

export const poreziDropdownSelector = () =>
  createSelector(racuniStateSelector, (racuni) =>
    racuni.porezi.map((porez) => ({ value: porez.id, label: porez.naziv }))
  );

export const porezIdSelector = (id) =>
  createSelector(racuniStateSelector, (racuni) =>
    racuni.porezi.find((porez) => porez.id === id)
  );
