import produce from 'immer';
import {
  SET_PREDRACUN,
  SET_PREDRACUNI,
} from '../actionTypes/PredracuniActionTypes';

const initialState = {
  predracuni: {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
  },

  predracun: {},
};

const predracuniReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_PREDRACUNI:
        draft.predracuni = action.payload;
        break;
      case SET_PREDRACUN:
        draft.predracun = action.payload;
        break;
      default:
        break;
    }
  });

export default predracuniReducer;
