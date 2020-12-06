import produce from 'immer';

import { SET_POREZI, SET_USLUGA, SET_USLUGE } from '../actionTypes/UslugeActionTypes';

const initialState = {
  usluge: {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
  },
  usluga: {},
  porezi: [],
};

const uslugeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_USLUGE:
        draft.usluge = action.payload;
        break;
      case SET_USLUGA:
        draft.usluga = action.payload;
        break;
      case SET_POREZI:
        draft.porezi = action.payload;
        break;
      default:
        break;
    }
  });

export default uslugeReducer;
