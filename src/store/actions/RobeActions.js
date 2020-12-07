import {
  GET_ROBA,
  GET_ROBE,
  SET_ROBA,
  SET_ROBE,
  STORE_ROBE,
  UPDATE_ROBE,
  DELETE_ROBE,
} from '../actionTypes/RobeActionTypes';

export const storeRoba = (payload) => ({
  type: STORE_ROBE,
  payload,
});

export const getRobe = (payload) => ({
  type: GET_ROBE,
  payload,
});

export const setRobe = (payload) => ({
  type: SET_ROBE,
  payload,
});

export const getRoba = (payload) => ({
  type: GET_ROBA,
  payload,
});

export const setRoba = (payload) => ({
  type: SET_ROBA,
  payload,
});

export const updateRoba = (payload) => ({
  type: UPDATE_ROBE,
  payload,
});

export const deleteRoba = (payload) => ({
  type: DELETE_ROBE,
  payload,
});
