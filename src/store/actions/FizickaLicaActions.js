import { GET_FIZICKA_LICA, SET_FIZICKA_LICA, STORE_FIZICKO_LICE } from "../actionTypes/FizickaLicaActionTypes";

export const storeFizickoLice = payload => ({
  type: STORE_FIZICKO_LICE,
  payload
});

export const getFizickaLica = payload => ({
  type: GET_FIZICKA_LICA,
  payload
});

export const setFizickaLica = payload => ({
  type: SET_FIZICKA_LICA,
  payload
});