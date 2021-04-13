import produce from 'immer';
import {
  RESET_NOVI_RACUN,
  SET_ATRIBUTI_GRUPE,
  SET_KOLICINA_ROBE,
  SET_KOLICINA_USLUGE,
  SET_ODABRANI_ATRIBUT_GRUPA,
  SET_RACUN,
  SET_RACUNI,
  SET_STAVKE_ROBE,
  SET_STAVKE_USLUGE,
  UKLONI_ROBU,
  UKLONI_USLUGU,
} from '../actionTypes/RacuniActionTypes';

export const emptyPaginated = {
  current_page: 1,
  last_page: 1,
  total: 0,
  data: [],
};

const initialState = {
  racuni: { ...emptyPaginated },
  racun: {},
  noviRacun: {
    robe: {},
    usluge: {},
  },
  stavke: {
    robe: { ...emptyPaginated },
    usluge: { ...emptyPaginated },
  },
  atributiGrupe: [],
  odabraniAtributGrupa: null,
};

const racuniReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    let id;
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
        id = action.payload.roba.id;

        if (!draft.noviRacun.robe[id]) draft.noviRacun.robe[id] = {};
        if (!draft.noviRacun.robe[id].kolicina) {
          draft.noviRacun.robe[id] = action.payload.roba;
        }
        draft.noviRacun.robe[id] = {
          ...draft.noviRacun.robe[id],
          kolicina: action.payload.kolicina,
        };
        if (action.payload.kolicina === 0) {
          delete draft.noviRacun.robe[id];
        }
        break;
      case SET_KOLICINA_USLUGE:
        id = action.payload.usluga.id;

        if (!draft.noviRacun.usluge[id]) draft.noviRacun.usluge[id] = {};
        if (!draft.noviRacun.usluge[id].kolicina) {
          draft.noviRacun.usluge[id] = action.payload.usluga;
        }
        draft.noviRacun.usluge[id] = {
          ...draft.noviRacun.usluge[id],
          kolicina: action.payload.kolicina,
        };
        if (action.payload.kolicina === 0) {
          delete draft.noviRacun.usluge[id];
        }
        break;
      case UKLONI_ROBU:
        delete draft.noviRacun.robe[action.payload.id];
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
      case SET_ATRIBUTI_GRUPE:
        draft.atributiGrupe = action.payload;
        break;
      case SET_ODABRANI_ATRIBUT_GRUPA:
        draft.odabraniAtributGrupa = action.payload;
        break;
      default:
        break;
    }
  });

export default racuniReducer;
