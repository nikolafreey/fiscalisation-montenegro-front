import produce from 'immer';
import { SET_PARTNERI } from '../actionTypes/PartneriActionTypes';

const initialState = {
  partneri: [],
};

const partneriReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_PARTNERI:
        draft.partneri = action.payload;
        break;
      default:
        break;
    }
  });

export default partneriReducer;
