import { all, takeLatest } from 'redux-saga/effects';
import {
  DELETE_FIZICKO_LICE,
  GET_FIZICKA_LICA,
  GET_FIZICKO_LICE,
  STORE_FIZICKO_LICE,
  UPDATE_FIZICKO_LICE,
} from '../actionTypes/FizickaLicaActionTypes';
import {
  GET_PARTNERI,
  STORE_PARTNERI,
} from '../actionTypes/PartneriActionTypes';
import { GET_USER, LOGIN, LOGOUT } from '../actionTypes/UserActionTypes';
import { fizickoLiceStore, fizickaLicaGet, fizickoLiceGet, fizickoLiceUpdate, fizickoLiceDelete } from './FizickaLicaSagas';
import { partneriGet, partnerStore } from './PartneriSagas';
import { userGet, userLogin, userLogout } from './UserSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(STORE_PARTNERI, partnerStore),
    takeLatest(GET_PARTNERI, partneriGet),
    takeLatest(STORE_FIZICKO_LICE, fizickoLiceStore),
    takeLatest(GET_FIZICKA_LICA, fizickaLicaGet),
    takeLatest(GET_FIZICKO_LICE, fizickoLiceGet),
    takeLatest(UPDATE_FIZICKO_LICE, fizickoLiceUpdate),
    takeLatest(DELETE_FIZICKO_LICE, fizickoLiceDelete),
    takeLatest(LOGIN, userLogin),
    takeLatest(LOGOUT, userLogout),
    takeLatest(GET_USER, userGet),
  ]);
}
