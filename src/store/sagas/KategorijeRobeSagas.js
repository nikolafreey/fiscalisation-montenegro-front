import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { kategorijeRobeService } from '../../services/KategorijeRobeService';
import { getKategorijeRobe, setKategorijeRobe, setPodkategorijeRobe } from '../actions/KategorijeRobeActions';

export function* kategorijaRobeStore({ payload }) {
  try {
    yield call(kategorijeRobeService.storeKategorijaRobe, payload);
    yield put(getKategorijeRobe());
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* kategorijeRobeGet({ payload }) {
  try {
    const { data } = yield call(kategorijeRobeService.getKategorijeRobe, payload);
    yield put(setKategorijeRobe(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* podkategorijaRobeStore({ payload }) {
  try {
    yield call(kategorijeRobeService.storePodkategorijaRobe, payload);
    yield put(getKategorijeRobe());
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* podkategorijeRobeGet({ payload }) {
  try {
    const { data } = yield call(kategorijeRobeService.getPodkategorijeRobe, payload);
    yield put(setPodkategorijeRobe(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

