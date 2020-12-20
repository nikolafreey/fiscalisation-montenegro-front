import produce from 'immer';
import {
  RESET_NOVI_RACUN,
  SET_KOLICINA_ROBE,
  SET_KOLICINA_USLUGE,
  SET_RACUN,
  SET_RACUNI,
  SET_STAVKE_ROBE,
  SET_STAVKE_USLUGE,
  UKLONI_ROBU,
  UKLONI_USLUGU,
} from '../actionTypes/RacuniActionTypes';

const emptyPaginated = {
  current_page: 1,
  last_page: 1,
  total: 0,
  data: [],
}

const initialState = {
  racuni: { ...emptyPaginated },
  racun: {},
  noviRacun: {
    robe: {},
    usluge: {},
  },
  stavke: {
    robe: { ...emptyPaginated },
    usluge: { ...emptyPaginated }
  }
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
        if (!draft.noviRacun.robe[action.payload.roba.roba.id]) draft.noviRacun.robe[action.payload.roba.roba.id] = {};
        if (!draft.noviRacun.robe[action.payload.roba.roba.id].kolicina) {
          draft.noviRacun.robe[action.payload.roba.roba.id] = action.payload.roba;
        }
        draft.noviRacun.robe[action.payload.roba.roba.id] =
          {...draft.noviRacun.robe[action.payload.roba.roba.id], kolicina: action.payload.kolicina};
        if (action.payload.kolicina === 0) {
          delete draft.noviRacun.robe[action.payload.roba.roba.id];
        }
        break;
      case SET_KOLICINA_USLUGE:
        if (!draft.noviRacun.usluge[action.payload.usluga.id]) draft.noviRacun.usluge[action.payload.usluga.id] = {};
        if (!draft.noviRacun.usluge[action.payload.usluga.id].kolicina) {
          draft.noviRacun.usluge[action.payload.usluga.id] = action.payload.usluga;
        }
        if (action.payload.kolicina === 0) {
          delete draft.noviRacun.usluge[action.payload.usluga.id];
        }
        draft.noviRacun.usluge[action.payload.usluga.id] =
          {...draft.noviRacun.usluge[action.payload.usluga.id], kolicina: action.payload.kolicina}
        if (action.payload.kolicina === 0) {
          delete draft.noviRacun.robe[action.payload.roba.roba.id];
        }
        break;
      case UKLONI_ROBU:
        delete draft.noviRacun.robe[action.payload.roba.id];
        break;
      case UKLONI_USLUGU:
        delete draft.noviRacun.usluge[action.payload.id];
        break;
      case SET_STAVKE_ROBE:
        draft.stavke.robe = action.payload;
        break;
      case SET_STAVKE_USLUGE:
        draft.stavke.usluge = action.payload;
        break;
      default:
        break;
    }
  });

export default racuniReducer;
