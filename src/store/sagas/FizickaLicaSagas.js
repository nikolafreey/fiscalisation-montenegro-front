
import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { fizickaLicaService } from '../../services/FizickaLicaService';
import { setFizickaLica, setFizickoLice } from '../actions/FizickaLicaActions';

export function* fizickoLiceStore({ payload }) {
  try {
    yield call(fizickaLicaService.storeFizickoLice, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* fizickaLicaGet({payload}) {
  try {
    const { data } = yield call(fizickaLicaService.getFizickaLica, payload);
    yield put(setFizickaLica(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* fizickoLiceGet({ payload }) {
  try {
    const { data } = yield call(fizickaLicaService.getFizickoLice, payload);
    yield put(setFizickoLice(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* fizickoLiceUpdate({ payload }) {
  try {
    const { data } = yield call(fizickaLicaService.updateFizickoLice, payload);
    put(setFizickoLice(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* fizickoLiceDelete({ payload }) {
  try {
    yield call(fizickaLicaService.deleteFizickoLice, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}