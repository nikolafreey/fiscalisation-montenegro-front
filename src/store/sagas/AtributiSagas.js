import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { atributiService } from '../../services/AtributiService';
import { getAtributi, getTipoviAtributa, setAtributi, setTipoviAtributa } from '../actions/AtributiActions';

export function* atributStore({ payload }) {
  try {
    yield call(atributiService.storeAtribut, payload);
    yield put(getAtributi());
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* atributiGet({ payload }) {
  try {
    const { data } = yield call(atributiService.getAtributi, payload);
    yield put(setAtributi(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* tipAtributaStore({ payload }) {
  try {
    yield call(atributiService.storeTipAtributa, payload);
    yield put(getTipoviAtributa());
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* tipoviAtributaGet({ payload }) {
  try {
    const { data } = yield call(atributiService.getTipoviAtributa, payload);
    yield put(setTipoviAtributa(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

