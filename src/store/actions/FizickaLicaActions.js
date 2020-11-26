import {
  GET_FIZICKA_LICA,
  SET_FIZICKA_LICA,
  GET_FIZICKO_LICE,
  SET_FIZICKO_LICE,
  STORE_FIZICKO_LICE,
  UPDATE_FIZICKO_LICE,
  DELETE_FIZICKO_LICE,
} from '../actionTypes/FizickaLicaActionTypes';

export const storeFizickoLice = (payload) => ({
  type: STORE_FIZICKO_LICE,
  payload,
});

export const getFizickaLica = (payload) => ({
  type: GET_FIZICKA_LICA,
  payload,
});

export const setFizickaLica = (payload) => ({
  type: SET_FIZICKA_LICA,
  payload,
});

export const getFizickoLice = (payload) => ({
  type: GET_FIZICKO_LICE,
  payload,
});

export const setFizickoLice = (payload) => ({
  type: SET_FIZICKO_LICE,
  payload,
});

export const updateFizickoLice = (payload) => ({
  type: UPDATE_FIZICKO_LICE,
  payload,
});

export const deleteFizickoLice = (payload) => ({
  type: DELETE_FIZICKO_LICE,
  payload,
});
