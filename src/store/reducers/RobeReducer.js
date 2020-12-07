import produce from 'immer';
import { SET_ROBA, SET_ROBE } from '../actionTypes/RobeActionTypes';

const initialState = {
  robe: {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
  },
  roba: {},
};

const robeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_ROBE:
        draft.robe = action.payload;
        break;
      case SET_ROBA:
        draft.roba = action.payload;
        break;
      default:
        break;
    }
  });

export default robeReducer;
