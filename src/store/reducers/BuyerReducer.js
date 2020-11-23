import produce from 'immer';
import {
  SET_BUYERS,
} from '../actionTypes/BuyerActionTypes';

const initialState = {
  buyers: []
};

const errorReducer = (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_BUYERS:
        draft.buyers = action.payload;
        break;
      default:
        break;
    }
  });

export default errorReducer;