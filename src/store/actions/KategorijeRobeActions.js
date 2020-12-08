import {
  GET_PODKATEGORIJE_ROBE,
  SET_PODKATEGORIJE_ROBE,
  STORE_PODKATEGORIJA_ROBE,
  GET_KATEGORIJE_ROBE,
  SET_KATEGORIJE_ROBE,
  STORE_KATEGORIJA_ROBE,
} from '../actionTypes/KategorijeRobeActionTypes';

export const storeKategorijaRobe = (payload) => ({
  type: STORE_KATEGORIJA_ROBE,
  payload,
});

export const getKategorijeRobe = (payload) => ({
  type: GET_KATEGORIJE_ROBE,
  payload,
});

export const setKategorijeRobe = (payload) => ({
  type: SET_KATEGORIJE_ROBE,
  payload,
});

export const storePodkategorijaRobe = (payload) => ({
  type: STORE_PODKATEGORIJA_ROBE,
  payload,
});

export const getPodkategorijeRobe = (payload) => ({
  type: GET_PODKATEGORIJE_ROBE,
  payload,
});

export const setPodkategorijeRobe = (payload) => ({
  type: SET_PODKATEGORIJE_ROBE,
  payload,
});
