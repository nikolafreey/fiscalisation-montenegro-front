import produce from 'immer';
import { SET_RACUN, SET_RACUNI } from '../actionTypes/RacuniActionTypes';

const initialState = {
  racuni: {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
  },
  racun: {},
};

const racuniReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_RACUNI:
        draft.racuni = action.payload;
        break;
      case SET_RACUN:
        draft.racun = action.payload;
        break;
      default:
        break;
    }
  });

export default racuniReducer;
