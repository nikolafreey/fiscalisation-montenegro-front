import produce from 'immer';
import { SET_ATRIBUTI, SET_TIPOVI_ATRIBUTA, SET_TIP_ATRIBUTA } from '../actionTypes/AtributiActionTypes';

const initialState = {
  atributi: [],
  tipovi_atributa: [],
  tip_atributa: {}
};

const atributiReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_ATRIBUTI:
        draft.atributi = action.payload;
        break;
      case SET_TIPOVI_ATRIBUTA:
        draft.tipovi_atributa = action.payload;
        break;
      case SET_TIP_ATRIBUTA:
        draft.tip_atributa = action.payload;
        break;
      default:
        break;
    }
  });

export default atributiReducer;
