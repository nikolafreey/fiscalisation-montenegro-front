import {
  DELETE_RACUN,
  GET_RACUN,
  GET_RACUNI,
  RESET_NOVI_RACUN,
  SET_KOLICINA_ROBE,
  SET_KOLICINA_USLUGE,
  SET_RACUN,
  SET_RACUNI,
  STORE_RACUN,
  UKLONI_ROBU,
  UKLONI_USLUGU,
  UPDATE_RACUN,
} from '../actionTypes/RacuniActionTypes';

export const storeRacun = () => ({
  type: STORE_RACUN,
});

export const getRacuni = (payload) => ({
  type: GET_RACUNI,
  payload,
});

export const setRacuni = (payload) => ({
  type: SET_RACUNI,
  payload,
});

export const getRacun = (payload) => ({
  type: GET_RACUN,
  payload,
});

export const setRacun = (payload) => ({
  type: SET_RACUN,
  payload,
});

export const updateRacun = (payload) => ({
  type: UPDATE_RACUN,
  payload,
});

export const deleteRacun = (payload) => ({
  type: DELETE_RACUN,
  payload,
});

export const resetNoviRacun = () => ({
  type: RESET_NOVI_RACUN
});

export const setKolicinaRobe = (roba, kolicina) => ({
  type: SET_KOLICINA_ROBE,
  payload: { roba, kolicina },
});

export const setKolicinaUsluge = (usluga, kolicina) => ({
  type: SET_KOLICINA_USLUGE,
  payload: { usluga, kolicina },
});


export const ukloniRobu = (roba) => ({
  type: UKLONI_ROBU,
  payload: roba,
});

export const ukloniUslugu = (usluga) => ({
  type: UKLONI_USLUGU,
  payload: usluga,
});
