import { createSelector } from 'reselect';

const ulazniRacuniStateSelector = (state) => state.ulazniRacuniReducer;

export const ulazniRacuniSelector = () =>
  createSelector(
    ulazniRacuniStateSelector,
    (ulazniRacuni) => ulazniRacuni.ulazniRacuni
  );

export const ulazniRacunSelector = () =>
  createSelector(
    ulazniRacuniStateSelector,
    (ulazniRacun) => ulazniRacun.ulazniRacun
  );
