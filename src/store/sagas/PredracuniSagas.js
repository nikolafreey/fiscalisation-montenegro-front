import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { predracuniService } from '../../services/PredracuniService';
import { setPredracun, setPredracuni } from '../actions/PredracuniActions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const toastSettings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export function* predracunStore({ payload }) {
  try {
    yield call(predracuniService.storePredracun, payload);
    toast.success('Uspješno dodat predračun: ' + payload.naziv, toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* predracuniGet({ payload }) {
  try {
    const { data } = yield call(predracuniService.getPredracuni, payload);
    yield put(setPredracuni(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* predracunGet({ payload }) {
  try {
    const { data } = yield call(predracuniService.getPredracun, payload);
    yield put(setPredracun(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* predracunUpdate({ payload }) {
  try {
    const { data } = yield call(predracuniService.updatePredracun, payload);
    put(setPredracun(data));
    toast.info('Uspješno ažuriran predračun:' + payload.naziv, toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* predracunDelete({ payload }) {
  try {
    yield call(predracuniService.deletePredracun, payload);
    toast.info('Uspješno ažuriran predračun id:' + payload, toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
