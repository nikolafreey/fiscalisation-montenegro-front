import { GET_USER, SET_USER } from "../actionTypes/UserActionTypes";

export const getUser = payload => ({
  type: GET_USER,
  payload
});

export const setUser = payload => ({
  type: SET_USER,
  payload
});