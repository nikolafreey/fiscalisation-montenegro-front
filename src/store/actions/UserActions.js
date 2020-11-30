import { FORGOT_PASSWORD, GET_USER, LOGIN, LOGOUT, RESET_PASSWORD, SET_USER } from "../actionTypes/UserActionTypes";

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

export const forgotPassword = payload => ({
  type: FORGOT_PASSWORD,
  payload
});

export const resetPassword = payload => ({
  type: RESET_PASSWORD,
  payload
});