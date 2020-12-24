import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { grupeService } from '../../services/GrupeService';
import { setGrupa, setGrupe } from '../actions/GrupeActions';

export function* grupaStore({ payload }) {
  try {
    yield call(grupeService.storeGrupa, payload);
    yield put(grupeService.getGrupe);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* grupeGet({ payload }) {
  try {
    const { data } = yield call(grupeService.getGrupe, payload);
    yield put(setGrupe(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* grupaGet({ payload }) {
  try {
    const { data } = yield call(grupeService.getGrupa, payload);
    yield put(setGrupa(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* grupaUpdate({ payload }) {
  try {
    const { data } = yield call(grupeService.updateGrupa, payload);
    put(setGrupa(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* grupaDelete({ payload }) {
  try {
    yield call(grupeService.deleteGrupa, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
