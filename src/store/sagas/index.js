import { all, takeLatest } from 'redux-saga/effects';
import { GET_BUYERS } from '../actionTypes/BuyerActionTypes';
import {
  GET_FIZICKA_LICA,
  STORE_FIZICKO_LICE,
} from '../actionTypes/FizickaLicaActionTypes';
import {
  GET_PARTNERI,
  STORE_PARTNERI,
} from '../actionTypes/PartneriActionTypes';
import { buyersGet } from './BuyerSagas';
import { fizickoLiceStore, fizickaLicaGet } from './FizickaLicaSagas';
import { partneriGet, partnerStore } from './PartneriSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(GET_BUYERS, buyersGet),
    takeLatest(STORE_FIZICKO_LICE, fizickoLiceStore),
    takeLatest(GET_FIZICKA_LICA, fizickaLicaGet),
    takeLatest(STORE_PARTNERI, partnerStore),
    takeLatest(GET_PARTNERI, partneriGet),
  ]);
}
