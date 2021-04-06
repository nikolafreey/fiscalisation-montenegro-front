import { all, takeLatest, takeEvery } from 'redux-saga/effects';
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
import {
  kategorijaRobeStore,
  kategorijeRobeGet,
  podkategorijaRobeStore,
  podkategorijeRobeGet,
} from './KategorijeRobeSagas';
import {
  GET_KATEGORIJE_ROBE,
  GET_PODKATEGORIJE_ROBE,
  STORE_KATEGORIJA_ROBE,
  STORE_PODKATEGORIJA_ROBE,
} from '../actionTypes/KategorijeRobeActionTypes';
import {
  GET_ATRIBUTI,
  GET_TIPOVI_ATRIBUTA,
  STORE_ATRIBUT,
  STORE_TIP_ATRIBUTA,
} from '../actionTypes/AtributiActionTypes';
import {
  atributiGet,
  atributStore,
  tipoviAtributaGet,
  tipAtributaStore,
} from './AtributiSagas';
import {
  DELETE_RACUN,
  GET_ATRIBUTI_GRUPE,
  GET_RACUN,
  GET_RACUNI,
  GET_STAVKE,
  STORE_BEZGOTOVINSKI_RACUN,
  STORE_RACUN,
  UPDATE_RACUN,
} from '../actionTypes/RacuniActionTypes';
import {
  atributiGrupeGet,
  bezgotovinskiRacunStore,
  racunDelete,
  racunGet,
  racuniGet,
  racunStore,
  racunUpdate,
  stavkeGet,
} from './RacuniSagas';
import {
  DELETE_ULAZNI_RACUN,
  GET_ULAZNI_RACUN,
  GET_ULAZNI_RACUNI,
  STORE_ULAZNI_RACUN,
  UPDATE_ULAZNI_RACUN,
} from '../actionTypes/UlazniRacuniActionTypes';
import {
  ulazniRacunDelete,
  ulazniRacunGet,
  ulazniRacuniGet,
  ulazniRacunStore,
  ulazniRacunUpdate,
} from './UlazniRacuniSagas';
import {
  DELETE_PREDRACUN,
  GET_PREDRACUN,
  GET_PREDRACUNI,
  STORE_PREDRACUN,
  UPDATE_PREDRACUN,
} from '../actionTypes/PredracuniActionTypes';
import {
  predracunDelete,
  predracunGet,
  predracuniGet,
  predracunStore,
  predracunUpdate,
} from './PredracuniSagas';
import {
  DELETE_GRUPA,
  GET_GRUPA,
  GET_GRUPE,
  STORE_GRUPA,
  UPDATE_GRUPA,
} from '../actionTypes/GrupeActionTypes';
import {
  grupaDelete,
  grupaGet,
  grupaStore,
  grupaUpdate,
  grupeGet,
} from './GrupeSagas';

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

    takeLatest(STORE_RACUN, racunStore),
    takeLatest(STORE_BEZGOTOVINSKI_RACUN, bezgotovinskiRacunStore),
    takeLatest(GET_RACUNI, racuniGet),
    takeLatest(GET_RACUN, racunGet),
    takeLatest(UPDATE_RACUN, racunUpdate),
    takeLatest(DELETE_RACUN, racunDelete),
    takeLatest(GET_STAVKE, stavkeGet),
    takeLatest(GET_ATRIBUTI_GRUPE, atributiGrupeGet),

    takeLatest(STORE_ULAZNI_RACUN, ulazniRacunStore),
    takeLatest(GET_ULAZNI_RACUNI, ulazniRacuniGet),
    takeLatest(GET_ULAZNI_RACUN, ulazniRacunGet),
    takeLatest(UPDATE_ULAZNI_RACUN, ulazniRacunUpdate),
    takeLatest(DELETE_ULAZNI_RACUN, ulazniRacunDelete),
    takeLatest(STORE_PREDRACUN, predracunStore),
    takeLatest(GET_PREDRACUNI, predracuniGet),
    takeLatest(GET_PREDRACUN, predracunGet),
    takeLatest(UPDATE_PREDRACUN, predracunUpdate),
    takeLatest(DELETE_PREDRACUN, predracunDelete),

    takeLatest(STORE_FIZICKO_LICE, fizickoLiceStore),
    takeLatest(GET_FIZICKA_LICA, fizickaLicaGet),
    takeLatest(GET_FIZICKO_LICE, fizickoLiceGet),
    takeLatest(UPDATE_FIZICKO_LICE, fizickoLiceUpdate),
    takeLatest(DELETE_FIZICKO_LICE, fizickoLiceDelete),

    takeLatest(STORE_ROBE, robaStore),
    takeLatest(GET_ROBA, robaGet),
    takeLatest(GET_ROBE, robeGet),
    takeLatest(UPDATE_ROBE, robaUpdate),
    takeEvery(DELETE_ROBE, robeDelete),

    takeLatest(STORE_PREDUZECE, preduzeceStore),
    takeLatest(GET_PREDUZECE, preduzeceGet),
    takeLatest(GET_PREDUZECA, preduzecaGet),
    takeLatest(DELETE_PREDUZECE, preduzeceDelete),
    takeLatest(UPDATE_PREDUZECE, preduzeceUpdate),

    takeLatest(STORE_USLUGA, uslugaStore),
    takeLatest(GET_USLUGA, uslugaGet),
    takeLatest(GET_USLUGE, uslugeGet),
    takeEvery(DELETE_USLUGA, uslugaDelete),
    takeLatest(UPDATE_USLUGA, uslugaUpdate),
    takeLatest(GET_POREZI, poreziGet),

    takeLatest(STORE_GRUPA, grupaStore),
    takeLatest(GET_GRUPA, grupaGet),
    takeLatest(GET_GRUPE, grupeGet),
    takeLatest(DELETE_GRUPA, grupaDelete),
    takeLatest(UPDATE_GRUPA, grupaUpdate),

    takeLatest(LOGIN, userLogin),
    takeLatest(LOGOUT, userLogout),
    takeLatest(GET_USER, userGet),
    takeLatest(FORGOT_PASSWORD, userForgotPassword),
    takeLatest(RESET_PASSWORD, userResetPassword),

    takeLatest(GET_KATEGORIJE_ROBE, kategorijeRobeGet),
    takeLatest(GET_PODKATEGORIJE_ROBE, podkategorijeRobeGet),
    takeLatest(STORE_KATEGORIJA_ROBE, kategorijaRobeStore),
    takeLatest(STORE_PODKATEGORIJA_ROBE, podkategorijaRobeStore),

    takeLatest(GET_ATRIBUTI, atributiGet),
    takeLatest(GET_TIPOVI_ATRIBUTA, tipoviAtributaGet),
    takeLatest(STORE_ATRIBUT, atributStore),
    takeLatest(STORE_TIP_ATRIBUTA, tipAtributaStore),
  ]);
}
