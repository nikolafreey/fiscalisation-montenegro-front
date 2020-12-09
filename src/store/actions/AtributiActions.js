import {
  GET_TIPOVI_ATRIBUTA,
  SET_TIPOVI_ATRIBUTA,
  STORE_TIP_ATRIBUTA,
  GET_ATRIBUTI,
  SET_ATRIBUTI,
  STORE_ATRIBUT,
  SET_TIP_ATRIBUTA,
} from '../actionTypes/AtributiActionTypes';

export const storeAtribut = (payload) => ({
  type: STORE_ATRIBUT,
  payload,
});

export const getAtributi = (payload) => ({
  type: GET_ATRIBUTI,
  payload,
});

export const setAtributi = (payload) => ({
  type: SET_ATRIBUTI,
  payload,
});

export const storeTipAtributa = (payload) => ({
  type: STORE_TIP_ATRIBUTA,
  payload,
});

export const getTipoviAtributa = (payload) => ({
  type: GET_TIPOVI_ATRIBUTA,
  payload,
});

export const setTipoviAtributa = (payload) => ({
  type: SET_TIPOVI_ATRIBUTA,
  payload,
});

export const setTipAtributa = (payload) => ({
  type: SET_TIP_ATRIBUTA,
  payload,
});