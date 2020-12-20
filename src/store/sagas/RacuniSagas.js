import { call, put, select } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { racuniService } from '../../services/RacuniService';
import { resetNoviRacun, setRacun, setRacuni, setStavkeRobe, setStavkeUsluge } from '../actions/RacuniActions';
import { noviRacunSelector } from '../selectors/RacuniSelector';

export function* racunStore() {
  try {
    const noviRacun = yield select(noviRacunSelector());
    yield call(racuniService.storeRacun, noviRacun);
    yield put(resetNoviRacun());
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* racuniGet({ payload }) {
  try {
    const { data } = yield call(racuniService.getRacuni, payload);
    yield put(setRacuni(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* racunGet({ payload }) {
  try {
    const { data } = yield call(racuniService.getRacun, payload);
    yield put(setRacun(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* racunUpdate({ payload }) {
  try {
    const { data } = yield call(racuniService.updateRacun, payload);
    put(setRacun(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* racunDelete({ payload }) {
  try {
    yield call(racuniService.deleteRacun, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* stavkeGet({ payload }) {
  try {
    const robeResponse = yield call(racuniService.getRobe, payload);
    yield put(setStavkeRobe(robeResponse.data));
    const uslugeResponse = yield call(racuniService.getUsluge, payload);
    yield put(setStavkeUsluge(uslugeResponse.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

