import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { partneriService } from '../../services/PartneriService';
import { setPartner, setPartneri } from '../actions/PartneriActions';

export function* partnerStore({ payload }) {
  try {
    yield call(partneriService.storePartner, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* partneriGet() {
  try {
    const { data } = yield call(partneriService.getPartneri);
    yield put(setPartneri(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* partnerGet({ payload }) {
  try {
    const { data } = yield call(partneriService.getPartner, payload);

    yield put(setPartner(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* partnerUpdate({ payload }) {
  try {
    const { data } = yield call(partneriService.updatePartner, payload);
    put(setPartner(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* partnerDelete({ payload }) {
  try {
    yield call(partneriService.deletePartner, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
