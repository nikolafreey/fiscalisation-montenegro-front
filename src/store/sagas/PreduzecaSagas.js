import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { preduzecaService } from '../../services/PreduzecaService';
import { setPreduzeca, setPreduzece } from '../actions/PreduzecaActions';

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

// export function* preduzeceStore({ payload }) {
//   try {
//     yield call(preduzecaService.storePreduzece, payload);
//     toast.success('Uspješno dodato preduzeće: ' + payload.naziv, toastSettings);
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* preduzeceStore({ payload }) {
  const res = yield call(preduzecaService.storePreduzece, payload);
  toast.success('Uspješno dodato preduzeće: ' + payload.naziv, toastSettings);

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* preduzecaGet({ payload }) {
//   try {
//     const { data } = yield call(preduzecaService.getPreduzeca, payload);
//     yield put(setPreduzeca(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* preduzecaGet({ payload }) {
  const res = yield call(preduzecaService.getPreduzeca, payload);
  yield put(setPreduzeca(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* preduzeceGet({ payload }) {
//   try {
//     const { data } = yield call(preduzecaService.getPreduzece, payload);
//     yield put(setPreduzece(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* preduzeceGet({ payload }) {
  const res = yield call(preduzecaService.getPreduzece, payload);
  yield put(setPreduzece(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* preduzeceUpdate({ payload }) {
//   try {
//     const { data } = yield call(preduzecaService.updatePreduzece, payload);
//     yield put(setPreduzece(data));
//     toast.info('Uspješno ažurirano preduzeće: ' + payload.naziv, toastSettings);
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* preduzeceUpdate({ payload }) {
  const res = yield call(preduzecaService.updatePreduzece, payload);
  yield put(setPreduzece(res.data));
  toast.info('Uspješno ažurirano preduzeće: ' + payload.naziv, toastSettings);

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* preduzeceDelete({ payload }) {
//   try {
//     yield call(preduzecaService.deletePreduzece, payload);
//     toast.success('Uspješno obrisano preduzeće id: ' + payload, toastSettings);
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* preduzeceDelete({ payload }) {
  const res = yield call(preduzecaService.deletePreduzece, payload);
  toast.success('Uspješno obrisano preduzeće id: ' + payload, toastSettings);

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}
