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
    const res = yield call(predracuniService.storePredracun, payload);
    toast.success('Uspješno dodat predračun', toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* predracunStore({ payload }) {
//   const res = yield call(predracuniService.storePredracun, payload);
//   toast.success('Uspješno dodat predračun', toastSettings);

//   if (res.status !== 201) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* predracuniGet({ payload }) {
  try {
    const res = yield call(predracuniService.getPredracuni, payload);
    yield put(setPredracuni(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* predracuniGet({ payload }) {
//   const res = yield call(predracuniService.getPredracuni, payload);
//   yield put(setPredracuni(res.data));

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* predracunGet({ payload }) {
  try {
    const res = yield call(predracuniService.getPredracun, payload);
    yield put(setPredracun(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* predracunGet({ payload }) {
//   const res = yield call(predracuniService.getPredracun, payload);
//   yield put(setPredracun(res.data));

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* predracunUpdate({ payload }) {
  try {
    const res = yield call(predracuniService.updatePredracun, payload);
    put(setPredracun(res.data));
    toast.info('Uspješno ažuriran predračun', toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* predracunUpdate({ payload }) {
//   const res = yield call(predracuniService.updatePredracun, payload);
//   put(setPredracun(res.data));
//   toast.info('Uspješno ažuriran predračun', toastSettings);

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* predracunDelete({ payload }) {
  try {
    const res = yield call(predracuniService.deletePredracun, payload);
    toast.info('Uspješno ažuriran predračun id:' + payload, toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* predracunDelete({ payload }) {
//   const res = yield call(predracuniService.deletePredracun, payload);
//   toast.info('Uspješno ažuriran predračun id:' + payload, toastSettings);

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }
