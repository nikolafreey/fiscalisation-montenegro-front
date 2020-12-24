import {
  DELETE_GRUPA,
  GET_GRUPA,
  GET_GRUPE,
  SET_GRUPA,
  SET_GRUPE,
  STORE_GRUPA,
  UPDATE_GRUPA,
} from '../actionTypes/GrupeActionTypes';

export const storeGrupa = (payload) => ({
  type: STORE_GRUPA,
  payload,
});

export const getGrupe = (payload) => ({
  type: GET_GRUPE,
  payload,
});

export const setGrupe = (payload) => ({
  type: SET_GRUPE,
  payload,
});

export const getGrupa = (payload) => ({
  type: GET_GRUPA,
  payload,
});

export const setGrupa = (payload) => ({
  type: SET_GRUPA,
  payload,
});

export const updateGrupa = (payload) => ({
  type: UPDATE_GRUPA,
  payload,
});

export const deleteGrupa = (payload) => ({
  type: DELETE_GRUPA,
  payload,
});
