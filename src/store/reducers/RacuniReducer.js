import produce from 'immer';
import {
  RESET_NOVI_RACUN,
  SET_KOLICINA_ROBE,
  SET_KOLICINA_USLUGE,
  SET_RACUN,
  SET_RACUNI,
  UKLONI_ROBU,
  UKLONI_USLUGU,
} from '../actionTypes/RacuniActionTypes';

const initialState = {
  racuni: {
    current_page: 1,
    last_page: 1,
    total: 0,
    data: [],
  },
  racun: {},
  noviRacun: {
    robe: {},
    usluge: {},
  },
};

const racuniReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_RACUNI:
        draft.racuni = action.payload;
        break;
      case SET_RACUN:
        draft.racun = action.payload;
        break;
      case RESET_NOVI_RACUN:
        draft.noviRacun = initialState.noviRacun;
        break;
      case SET_KOLICINA_ROBE:
        draft.noviRacun.robe[action.payload.roba.id].kolicina =
          action.payload.kolicina;
        break;
      case SET_KOLICINA_USLUGE:
        draft.noviRacun.usluge[action.payload.usluga.id].kolicina =
          action.payload.kolicina;
        break;
      case UKLONI_ROBU:
        delete draft.noviRacun.robe[action.payload.id];
        break;
      case UKLONI_USLUGU:
        delete draft.noviRacun.usluge[action.payload.id];
        break;

      default:
        break;
    }
  });

export default racuniReducer;
