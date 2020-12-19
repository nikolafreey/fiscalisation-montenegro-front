import {
  DELETE_PREDRACUN,
  GET_PREDRACUN,
  GET_PREDRACUNI,
  SET_PREDRACUN,
  SET_PREDRACUNI,
  STORE_PREDRACUN,
  UPDATE_PREDRACUN,
} from '../actionTypes/PredracuniActionTypes';

export const storePredracun = (payload) => ({
  type: STORE_PREDRACUN,
  payload,
});

export const getPredracuni = (payload) => ({
  type: GET_PREDRACUNI,
  payload,
});

export const setPredracuni = (payload) => ({
  type: SET_PREDRACUNI,
  payload,
});

export const getPredracun = (payload) => ({
  type: GET_PREDRACUN,
  payload,
});

export const setPredracun = (payload) => ({
  type: SET_PREDRACUN,
  payload,
});

export const updatePredracun = (payload) => ({
  type: UPDATE_PREDRACUN,
  payload,
});

export const deletePredracun = (payload) => ({
  type: DELETE_PREDRACUN,
  payload,
});
