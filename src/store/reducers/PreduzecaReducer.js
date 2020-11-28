import produce from 'immer';
import {
  SET_PREDUZECA,
  SET_PREDUZECE,
} from '../actionTypes/PreduzecaActionTypes';

const initialState = {
  preduzeca: {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
  },
  preduzece: {},
};

const preduzecaReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_PREDUZECA:
        draft.preduzeca = action.payload;
        break;
      case SET_PREDUZECE:
        draft.preduzece = action.payload;
        break;
      default:
        break;
    }
  });

export default preduzecaReducer;
