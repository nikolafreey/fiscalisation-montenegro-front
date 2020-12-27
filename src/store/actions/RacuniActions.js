import {
  DELETE_RACUN,
  GET_ATRIBUTI_GRUPE,
  GET_RACUN,
  GET_RACUNI,
  GET_STAVKE,
  RESET_NOVI_RACUN,
  SET_ATRIBUTI_GRUPE,
  SET_KOLICINA_ROBE,
  SET_KOLICINA_USLUGE,
  SET_ODABRANI_ATRIBUT_GRUPA,
  SET_RACUN,
  SET_RACUNI,
  SET_STAVKE_ROBE,
  SET_STAVKE_USLUGE,
  STORE_BEZGOTOVINSKI_RACUN,
  STORE_RACUN,
  UKLONI_ROBU,
  UKLONI_USLUGU,
  UPDATE_RACUN,
} from '../actionTypes/RacuniActionTypes';

export const storeRacun = () => ({
  type: STORE_RACUN,
});

export const storeBezgotovinskiRacun = (payload) => ({
  type: STORE_BEZGOTOVINSKI_RACUN,
  payload
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

export const getStavke = (payload) => ({
  type: GET_STAVKE,
  payload,
});

export const setStavkeRobe = (payload) => ({
  type: SET_STAVKE_ROBE,
  payload,
});

export const setStavkeUsluge = (payload) => ({
  type: SET_STAVKE_USLUGE,
  payload,
});


export const getAtributiGrupe = (payload) => ({
  type: GET_ATRIBUTI_GRUPE,
  payload,
});

export const setAtributiGrupe = (payload) => ({
  type: SET_ATRIBUTI_GRUPE,
  payload,
});

export const setOdabraniAtributGrupa = (payload) => ({
  type: SET_ODABRANI_ATRIBUT_GRUPA,
  payload,
});

