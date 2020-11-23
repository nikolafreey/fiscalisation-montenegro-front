import { GLOBAL_ERROR_SET } from "../actionTypes/ErrorActionTypes";


export const setGlobalError = payload => ({
  type: GLOBAL_ERROR_SET,
  payload
});