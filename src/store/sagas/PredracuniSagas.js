import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { predracuniService } from '../../services/PredracuniService';
import { setPredracun, setPredracuni } from '../actions/PredracuniActions';

export function* predracunStore({ payload }) {
  try {
    yield call(predracuniService.storePredracun, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* predracuniGet({ payload }) {
  try {
    const { data } = yield call(predracuniService.getPredracuni, payload);
    yield put(setPredracuni(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* predracunGet({ payload }) {
  try {
    const { data } = yield call(predracuniService.getPredracun, payload);
    yield put(setPredracun(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* predracunUpdate({ payload }) {
  try {
    const { data } = yield call(predracuniService.updatePredracun, payload);
    put(setPredracun(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* predracunDelete({ payload }) {
  try {
    yield call(predracuniService.deletePredracun, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
