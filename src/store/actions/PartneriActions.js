import {
  GET_PARTNERI,
  SET_PARTNER,
  SET_PARTNERI,
  STORE_PARTNERI,
  UPDATE_PARTNER,
  GET_PARTNER,
  DELETE_PARTNER,
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

export const getPartner = (payload) => ({
  type: GET_PARTNER,
  payload,
});

export const setPartner = (payload) => ({
  type: SET_PARTNER,
  payload,
});

export const updatePartner = (payload) => ({
  type: UPDATE_PARTNER,
  payload,
});

export const deletePartner = (payload) => ({
  type: DELETE_PARTNER,
  payload,
});
