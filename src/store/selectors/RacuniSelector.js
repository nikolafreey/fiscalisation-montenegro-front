import { createSelector } from 'reselect';

const racuniStateSelector = (state) => state.racuniReducer;

export const racuniSelector = () =>
  createSelector(racuniStateSelector, (racuniState) => racuniState.racuni);

export const racunSelector = () =>
  createSelector(racuniStateSelector, (racuniState) => racuniState.racun);

export const noviRacunSelector = () =>
  createSelector(racuniStateSelector, (racuniState) => racuniState.noviRacun);

export const noviRacunUslugaSelector = (uslugaId) =>
  createSelector(racuniStateSelector, (racuniState) => racuniState.noviRacun.usluge[uslugaId]);

export const noviRacunRobaSelector = (robaId) =>
  createSelector(racuniStateSelector, (racuniState) => racuniState.noviRacun.robe[robaId]);