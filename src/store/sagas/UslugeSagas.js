import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { uslugeService } from '../../services/UslugeService';
import { setPorezi, setUsluga, setUsluge } from '../actions/UslugeActions';
import { poreziService } from '../../services/PoreziService';

export function* uslugaStore({ payload }) {
  try {
    yield call(uslugeService.storeUsluga, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* uslugeGet({ payload }) {
  try {
    const { data } = yield call(uslugeService.getUsluge, payload);
    yield put(setUsluge(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* uslugaGet({ payload }) {
  try {
    const { data } = yield call(uslugeService.getUsluga, payload);
    yield put(setUsluga(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* uslugaUpdate({ payload }) {
  try {
    const { data } = yield call(uslugeService.updateUsluga, payload);
    put(setUsluga(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* uslugaDelete({ payload }) {
  try {
    yield call(uslugeService.deleteUsluga, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* poreziGet({ payload }) {
  try {
    const { data } = yield call(poreziService.getPorezi, payload);
    yield put(setPorezi(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
