import produce from 'immer';
import { SET_PARTNER, SET_PARTNERI } from '../actionTypes/PartneriActionTypes';

const initialState = {
  partneri: {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
  },
  partner: {},
};

const partneriReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_PARTNERI:
        draft.partneri = action.payload;
        break;
      case SET_PARTNER:
        draft.partner = action.payload;
        break;
      default:
        break;
    }
  });

export default partneriReducer;
