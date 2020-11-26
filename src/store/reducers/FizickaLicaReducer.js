import produce from 'immer';
import {
  SET_FIZICKA_LICA, SET_FIZICKO_LICE,
} from '../actionTypes/FizickaLicaActionTypes';

const initialState = {
  fizicka_lica: [],
  fizicko_lice: {},
};

const fizickaLicaReducer = (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_FIZICKA_LICA:
        draft.fizicka_lica = action.payload;
        break;
      case SET_FIZICKO_LICE:
        draft.fizicko_lice = action.payload;
        break;
      default:
        break;
    }
  });

export default fizickaLicaReducer;