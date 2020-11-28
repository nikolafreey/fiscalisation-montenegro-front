import { all, takeLatest } from 'redux-saga/effects';
import {
  DELETE_FIZICKO_LICE,
  GET_FIZICKA_LICA,
  GET_FIZICKO_LICE,
  STORE_FIZICKO_LICE,
  UPDATE_FIZICKO_LICE,
} from '../actionTypes/FizickaLicaActionTypes';
import {
  DELETE_PREDUZECE,
  GET_PREDUZECA,
  GET_PREDUZECE,
  STORE_PREDUZECE,
  UPDATE_PREDUZECE,
} from '../actionTypes/PreduzecaActionTypes';
import {
  GET_PARTNERI,
  STORE_PARTNERI,
} from '../actionTypes/PartneriActionTypes';
import {
  fizickoLiceStore,
  fizickaLicaGet,
  fizickoLiceGet,
  fizickoLiceUpdate,
  fizickoLiceDelete,
} from './FizickaLicaSagas';
import { partneriGet, partnerStore } from './PartneriSagas';
import {
  preduzeceGet,
  preduzeceStore,
  preduzeceUpdate,
  preduzecaGet,
  preduzeceDelete,
} from './PreduzecaSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(STORE_PARTNERI, partnerStore),
    takeLatest(GET_PARTNERI, partneriGet),

    takeLatest(STORE_FIZICKO_LICE, fizickoLiceStore),
    takeLatest(GET_FIZICKA_LICA, fizickaLicaGet),
    takeLatest(GET_FIZICKO_LICE, fizickoLiceGet),
    takeLatest(UPDATE_FIZICKO_LICE, fizickoLiceUpdate),
    takeLatest(DELETE_FIZICKO_LICE, fizickoLiceDelete),

    takeLatest(STORE_PREDUZECE, preduzeceStore),
    takeLatest(GET_PREDUZECE, preduzeceGet),
    takeLatest(GET_PREDUZECA, preduzecaGet),
    takeLatest(DELETE_PREDUZECE, preduzeceDelete),
    takeLatest(UPDATE_PREDUZECE, preduzeceUpdate),
  ]);
}
