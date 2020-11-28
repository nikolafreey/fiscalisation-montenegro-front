import { GET_USER, LOGIN, LOGOUT, SET_USER } from "../actionTypes/UserActionTypes";

export const getUser = payload => ({
  type: GET_USER,
  payload
});

export const setUser = payload => ({
  type: SET_USER,
  payload
});

export const loginUser = payload => ({
  type: LOGIN,
  payload
});

export const logoutUser = payload => ({
  type: LOGOUT,
  payload
});