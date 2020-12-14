import {
  DELETE_RACUN,
  GET_RACUN,
  GET_RACUNI,
  SET_RACUN,
  SET_RACUNI,
  STORE_RACUN,
  UPDATE_RACUN,
} from '../actionTypes/RacuniActionTypes';

export const storeRacun = (payload) => ({
  type: STORE_RACUN,
  payload,
});

export const getRacuni = (payload) => ({
  type: GET_RACUNI,
  payload,
});

export const setRacuni = (payload) => ({
  type: SET_RACUNI,
  payload,
});

export const getRacun = (payload) => ({
  type: GET_RACUN,
  payload,
});

export const setRacun = (payload) => ({
  type: SET_RACUN,
  payload,
});

export const updateRacun = (payload) => ({
  type: UPDATE_RACUN,
  payload,
});

export const deleteRacun = (payload) => ({
  type: DELETE_RACUN,
  payload,
});
