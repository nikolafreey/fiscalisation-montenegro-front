import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { setRacun } from '../actions/RacuniActions';
import { ulazniRacuniService } from '../../services/UlazniRacuniService';
import {
  setUlazniRacun,
  setUlazniRacuni,
} from '../actions/UlazniRacuniActions';

export function* ulazniRacunStore({ payload }) {
  try {
    yield call(ulazniRacuniService.storeUlazniRacun, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* ulazniRacuniGet({ payload }) {
  try {
    const { data } = yield call(ulazniRacuniService.getUlazniRacuni, payload);
    yield put(setUlazniRacuni(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* ulazniRacunGet({ payload }) {
  try {
    const { data } = yield call(ulazniRacuniService.getUlazniRacun, payload);
    yield put(setRacun(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* ulazniRacunUpdate({ payload }) {
  try {
    const { data } = yield call(ulazniRacuniService.updateUlazniRacun, payload);
    put(setUlazniRacun(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* ulazniRacunDelete({ payload }) {
  try {
    yield call(ulazniRacuniService.deleteUlazniRacun, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
