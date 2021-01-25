import { call, put, select } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { atributiService } from '../../services/AtributiService';
import {
  getTipoviAtributa,
  setAtributi,
  setTipAtributa,
  setTipoviAtributa,
} from '../actions/AtributiActions';
import { tipAtributaSelector } from '../selectors/AtributiSelector';

export function* atributStore({ payload }) {
  try {
    const tipAtributa = yield call(atributiService.storeAtribut, payload);
    yield put(getTipoviAtributa());
    const tipAtributaState = yield select(tipAtributaSelector());
    yield put(
      setTipAtributa({
        ...tipAtributaState,
        atributi: [...tipAtributaState.atributi, tipAtributa.data],
      })
    );
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
