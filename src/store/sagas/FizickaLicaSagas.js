
import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { fizickaLicaService } from '../../services/FizickaLicaService';
import { setFizickaLica } from '../actions/FizickaLicaActions';

export function* fizickoLiceStore({ payload }) {
  try {
    yield call(fizickaLicaService.storeFizickoLice, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* fizickaLicaGet() {
  try {
    const { data } = yield call(fizickaLicaService.getFizickaLica);
    put(setFizickaLica(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}