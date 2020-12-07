import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { robeService } from '../../services/RobeService';
import { setRoba, setRobe } from '../actions/RobeActions';

export function* robaStore({ payload }) {
  try {
    yield call(robeService.storeRoba, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* robeGet({ payload }) {
  try {
    const { data } = yield call(robeService.getRobe, payload);
    yield put(setRobe(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* robaGet({ payload }) {
  try {
    const { data } = yield call(robeService.getRoba, payload);
    yield put(setRoba(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* robaUpdate({ payload }) {
  try {
    const { data } = yield call(robeService.updateRoba, payload);
    put(setRoba(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* robeDelete({ payload }) {
  try {
    yield call(robeService.deleteRoba, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
