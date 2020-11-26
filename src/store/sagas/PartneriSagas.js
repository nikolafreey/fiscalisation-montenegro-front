import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { partneriService } from '../../services/PartneriService';
import { setPartneri } from '../actions/PartneriActions';

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
    put(setPartneri(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
