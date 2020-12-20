import produce from 'immer';
import {
  SET_ULAZNI_RACUN,
  SET_ULAZNI_RACUNI,
} from '../actionTypes/UlazniRacuniActionTypes';

const initialState = {
  ulazniRacuni: {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
  },
  ulazniRacun: {},
};

const ulazniRacuniReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_ULAZNI_RACUNI:
        draft.ulazniRacuni = action.payload;
        break;
      case SET_ULAZNI_RACUN:
        draft.ulazniRacuni = action.payload;
        break;
      default:
        break;
    }
  });

export default ulazniRacuniReducer;
