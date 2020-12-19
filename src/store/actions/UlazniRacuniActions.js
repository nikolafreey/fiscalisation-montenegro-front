import {
  DELETE_ULAZNI_RACUN,
  GET_ULAZNI_RACUN,
  GET_ULAZNI_RACUNI,
  SET_ULAZNI_RACUN,
  STORE_ULAZNI_RACUN,
  UPDATE_ULAZNI_RACUN,
} from '../actionTypes/UlazniRacuniActionTypes';

export const storeUlazniRacun = (payload) => ({
  type: STORE_ULAZNI_RACUN,
  payload,
});

export const getUlazniRacuni = (payload) => ({
  type: GET_ULAZNI_RACUNI,
  payload,
});

export const setUlazniRacuni = (payload) => ({
  type: SET_ULAZNI_RACUN,
  payload,
});

export const getUlazniRacun = (payload) => ({
  type: GET_ULAZNI_RACUN,
  payload,
});

export const setUlazniRacun = (payload) => ({
  type: SET_ULAZNI_RACUN,
  payload,
});

export const updateUlazniRacun = (payload) => ({
  type: UPDATE_ULAZNI_RACUN,
  payload,
});

export const deleteUlazniRacun = (payload) => ({
  type: DELETE_ULAZNI_RACUN,
  payload,
});
