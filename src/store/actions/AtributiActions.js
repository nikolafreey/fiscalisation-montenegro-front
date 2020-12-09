import {
  GET_TIPOVI_ATRIBUTA,
  SET_TIPOVI_ATRIBUTA,
  STORE_TIP_ATRIBUTA,
  GET_ATRIBUTI,
  SET_ATRIBUTI,
  STORE_ATRIBUT,
} from '../actionTypes/KategorijeRobeActionTypes';

export const storeKategorijaRobe = (payload) => ({
  type: STORE_ATRIBUT,
  payload,
});

export const getKategorijeRobe = (payload) => ({
  type: GET_ATRIBUTI,
  payload,
});

export const setKategorijeRobe = (payload) => ({
  type: SET_ATRIBUTI,
  payload,
});

export const storeTipAtributa = (payload) => ({
  type: STORE_TIP_ATRIBUTA,
  payload,
});

export const getPodkategorijeRobe = (payload) => ({
  type: GET_TIPOVI_ATRIBUTA,
  payload,
});

export const setPodkategorijeRobe = (payload) => ({
  type: SET_TIPOVI_ATRIBUTA,
  payload,
});