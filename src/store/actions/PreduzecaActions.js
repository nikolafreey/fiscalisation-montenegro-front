import {
  GET_PREDUZECA,
  SET_PREDUZECA,
  GET_PREDUZECE,
  SET_PREDUZECE,
  STORE_PREDUZECE,
  UPDATE_PREDUZECE,
  DELETE_PREDUZECE,
} from '../actionTypes/PreduzecaActionTypes';

export const storePreduzece = (payload) => ({
  type: STORE_PREDUZECE,
  payload,
});

export const getPreduzeca = (payload) => ({
  type: GET_PREDUZECA,
  payload,
});

export const setPreduzeca = (payload) => ({
  type: SET_PREDUZECA,
  payload,
});

export const getPreduzece = (payload) => ({
  type: GET_PREDUZECE,
  payload,
});

export const setPreduzece = (payload) => ({
  type: SET_PREDUZECE,
  payload,
});

export const updatePreduzece = (payload) => ({
  type: UPDATE_PREDUZECE,
  payload,
});

export const deletePreduzece = (payload) => ({
  type: DELETE_PREDUZECE,
  payload,
});
