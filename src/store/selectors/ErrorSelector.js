import { createSelector } from 'reselect';

const errorStateSelector = state => state.errorReducer;

export const globalErrorSelector = () =>
  createSelector(errorStateSelector, error => error.globalError);

  export const loginErrorSelector = () =>
  createSelector(errorStateSelector, error => error.loginError);