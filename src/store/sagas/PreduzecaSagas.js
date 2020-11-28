import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { preduzecaService } from '../../services/PreduzecaService';
import { setPreduzeca, setPreduzece } from '../actions/PreduzecaActions';

export function* preduzeceStore({ payload }) {
  try {
    yield call(preduzecaService.storePreduzece, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* preduzecaGet({ payload }) {
  try {
    const { data } = yield call(preduzecaService.getPreduzeca, payload);
    yield put(setPreduzeca(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* preduzeceGet({ payload }) {
  try {
    const { data } = yield call(preduzecaService.getPreduzece, payload);
    yield put(setPreduzece(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* preduzeceUpdate({ payload }) {
  try {
    const { data } = yield call(preduzecaService.updatePreduzece, payload);
    yield put(setPreduzece(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* preduzeceDelete({ payload }) {
  try {
    yield call(preduzecaService.deletePreduzece, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
