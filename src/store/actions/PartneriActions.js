//import { GET_FIZICKA_LICA, SET_FIZICKA_LICA, STORE_FIZICKO_LICE } from "../actionTypes/FizickaLicaActionTypes";

import {
  GET_PARTNERI,
  SET_PARTNERI,
  STORE_PARTNERI,
} from '../actionTypes/PartneriActionTypes';

export const storePartner = (payload) => ({
  type: STORE_PARTNERI,
  payload,
});

export const getPartneri = () => ({
  type: GET_PARTNERI,
});

export const setPartneri = (payload) => ({
  type: SET_PARTNERI,
  payload,
});
