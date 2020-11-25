import produce from 'immer';
import {
  SET_FIZICKA_LICA,
} from '../actionTypes/FizickaLicaActionTypes';

const initialState = {
  fizicka_lica: []
};

const fizickaLicaReducer = (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_FIZICKA_LICA:
        draft.fizicka_lica = action.payload;
        break;
      default:
        break;
    }
  });

export default fizickaLicaReducer;