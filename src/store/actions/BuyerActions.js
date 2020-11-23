import { SET_BUYERS, GET_BUYERS } from "../actionTypes/BuyerActionTypes";

export const getBuyers = () => ({
  type: GET_BUYERS
});

export const setBuyers = payload => ({
  type: SET_BUYERS,
  payload
});