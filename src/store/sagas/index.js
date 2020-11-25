
import { all, takeLatest } from 'redux-saga/effects';
import { GET_BUYERS } from '../actionTypes/BuyerActionTypes';
import { GET_FIZICKA_LICA, STORE_FIZICKO_LICE } from '../actionTypes/FizickaLicaActionTypes';
import { buyersGet } from './BuyerSagas';
import { fizickoLiceStore, fizickaLicaGet } from './FizickaLicaSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(GET_BUYERS, buyersGet),
    takeLatest(STORE_FIZICKO_LICE, fizickoLiceStore),
    takeLatest(GET_FIZICKA_LICA, fizickaLicaGet),
  ]);
}