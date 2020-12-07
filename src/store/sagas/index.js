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
  UPDATE_PARTNER,
  DELETE_PARTNER,
  GET_PARTNER,
} from '../actionTypes/PartneriActionTypes';
import {
  preduzeceGet,
  preduzeceStore,
  preduzeceUpdate,
  preduzecaGet,
  preduzeceDelete,
} from './PreduzecaSagas';
import {
  FORGOT_PASSWORD,
  GET_USER,
  LOGIN,
  LOGOUT,
  RESET_PASSWORD,
} from '../actionTypes/UserActionTypes';
import {
  fizickoLiceStore,
  fizickaLicaGet,
  fizickoLiceGet,
  fizickoLiceUpdate,
  fizickoLiceDelete,
} from './FizickaLicaSagas';
import {
  partnerDelete,
  partnerGet,
  partneriGet,
  partnerStore,
  partnerUpdate,
} from './PartneriSagas';
import {
  userGet,
  userForgotPassword,
  userResetPassword,
  userLogin,
  userLogout,
} from './UserSagas';
import {
  DELETE_USLUGA,
  GET_POREZI,
  GET_USLUGA,
  GET_USLUGE,
  STORE_USLUGA,
  UPDATE_USLUGA,
} from '../actionTypes/UslugeActionTypes';
import {
  poreziGet,
  uslugaDelete,
  uslugaGet,
  uslugaStore,
  uslugaUpdate,
  uslugeGet,
} from './UslugeSagas';
import {
  DELETE_ROBE,
  GET_ROBA,
  GET_ROBE,
  STORE_ROBE,
  UPDATE_ROBE,
} from '../actionTypes/RobeActionTypes';
import {
  robaGet,
  robaStore,
  robaUpdate,
  robeDelete,
  robeGet,
} from './RobeSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(STORE_PARTNERI, partnerStore),
    takeLatest(GET_PARTNERI, partneriGet),
    takeLatest(GET_PARTNER, partnerGet),
    takeLatest(UPDATE_PARTNER, partnerUpdate),
    takeLatest(DELETE_PARTNER, partnerDelete),

    takeLatest(STORE_FIZICKO_LICE, fizickoLiceStore),
    takeLatest(GET_FIZICKA_LICA, fizickaLicaGet),
    takeLatest(GET_FIZICKO_LICE, fizickoLiceGet),
    takeLatest(UPDATE_FIZICKO_LICE, fizickoLiceUpdate),
    takeLatest(DELETE_FIZICKO_LICE, fizickoLiceDelete),

    takeLatest(STORE_ROBE, robaStore),
    takeLatest(GET_ROBA, robeGet),
    takeLatest(GET_ROBE, robaGet),
    takeLatest(UPDATE_ROBE, robaUpdate),
    takeLatest(DELETE_ROBE, robeDelete),

    takeLatest(STORE_PREDUZECE, preduzeceStore),
    takeLatest(GET_PREDUZECE, preduzeceGet),
    takeLatest(GET_PREDUZECA, preduzecaGet),
    takeLatest(DELETE_PREDUZECE, preduzeceDelete),
    takeLatest(UPDATE_PREDUZECE, preduzeceUpdate),

    takeLatest(STORE_USLUGA, uslugaStore),
    takeLatest(GET_USLUGA, uslugaGet),
    takeLatest(GET_USLUGE, uslugeGet),
    takeLatest(DELETE_USLUGA, uslugaDelete),
    takeLatest(UPDATE_USLUGA, uslugaUpdate),
    takeLatest(GET_POREZI, poreziGet),

    takeLatest(LOGIN, userLogin),
    takeLatest(LOGOUT, userLogout),
    takeLatest(GET_USER, userGet),
    takeLatest(FORGOT_PASSWORD, userForgotPassword),
    takeLatest(RESET_PASSWORD, userResetPassword),
  ]);
}
