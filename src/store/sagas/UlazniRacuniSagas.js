import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { setRacun } from '../actions/RacuniActions';
import { ulazniRacuniService } from '../../services/UlazniRacuniService';
import {
  setUlazniRacun,
  setUlazniRacuni,
} from '../actions/UlazniRacuniActions';

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

// export function* ulazniRacunStore({ payload }) {
//   try {
//     yield call(ulazniRacuniService.storeUlazniRacun, payload);
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* ulazniRacunStore({ payload }) {
  const res = yield call(ulazniRacuniService.storeUlazniRacun, payload);

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* ulazniRacuniGet({ payload }) {
//   try {
//     const { data } = yield call(ulazniRacuniService.getUlazniRacuni, payload);
//     yield put(setUlazniRacuni(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* ulazniRacuniGet({ payload }) {
  const res = yield call(ulazniRacuniService.getUlazniRacuni, payload);
  yield put(setUlazniRacuni(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* ulazniRacunGet({ payload }) {
//   try {
//     const { data } = yield call(ulazniRacuniService.getUlazniRacun, payload);
//     yield put(setRacun(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* ulazniRacunGet({ payload }) {
  const res = yield call(ulazniRacuniService.getUlazniRacun, payload);
  yield put(setRacun(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* ulazniRacunUpdate({ payload }) {
//   try {
//     const { data } = yield call(ulazniRacuniService.updateUlazniRacun, payload);
//     put(setUlazniRacun(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* ulazniRacunUpdate({ payload }) {
  const res = yield call(ulazniRacuniService.updateUlazniRacun, payload);
  put(setUlazniRacun(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

export function* ulazniRacunDelete({ payload }) {
  try {
    yield call(ulazniRacuniService.deleteUlazniRacun, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
