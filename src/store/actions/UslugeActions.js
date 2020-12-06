import {
  DELETE_USLUGA,
  GET_POREZI,
  GET_USLUGA,
  GET_USLUGE,
  SET_POREZI,
  SET_USLUGA,
  SET_USLUGE,
  STORE_USLUGA,
  UPDATE_USLUGA,
} from '../actionTypes/UslugeActionTypes';

export const storeUsluga = (payload) => ({
  type: STORE_USLUGA,
  payload,
});

export const getUsluge = (payload) => ({
  type: GET_USLUGE,
  payload,
});

export const setUsluge = (payload) => ({
  type: SET_USLUGE,
  payload,
});

export const getUsluga = (payload) => ({
  type: GET_USLUGA,
  payload,
});

export const setUsluga = (payload) => ({
  type: SET_USLUGA,
  payload,
});

export const updateUsluga = (payload) => ({
  type: UPDATE_USLUGA,
  payload,
});

export const deleteUsluga = (payload) => ({
  type: DELETE_USLUGA,
  payload,
});

export const getPorezi = (payload) => ({
  type: GET_POREZI,
  payload,
});

export const setPorezi = (payload) => ({
  type: SET_POREZI,
  payload,
});
