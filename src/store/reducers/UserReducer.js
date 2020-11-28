import produce from 'immer';
import {
  SET_USER,
} from '../actionTypes/UserActionTypes';

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_USER:
        draft.users = action.payload;
        break;
      default:
        break;
    }
  });

export default userReducer;