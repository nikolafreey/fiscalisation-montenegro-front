import { call, put, select } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { uslugeService } from '../../services/UslugeService';
import { setPorezi, setUsluga, setUsluge } from '../actions/UslugeActions';
import { poreziService } from '../../services/PoreziService';
import { uslugeSelector } from '../selectors/UslugeSelector';
import { stavkeUslugeSelector } from '../selectors/RacuniSelector';

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

// export function* uslugaStore({ payload }) {
//   try {
//     const res = yield call(uslugeService.storeUsluga, payload);
//     console.log('uslugaStore', res);
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     toast.success('Uspješno dodata usluga: ' + payload.naziv, toastSettings);
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* uslugaStore({ payload }) {
  const res = yield call(uslugeService.storeUsluga, payload);
  console.log('uslugaStore', res);
  toast.success('Uspješno dodata usluga: ' + payload.naziv, toastSettings);

  if (res.status !== 201) {
    console.log('uslugaStoreError', res);
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* uslugeGet({ payload }) {
//   try {
//     const { data } = yield call(uslugeService.getUsluge, payload);
//     yield put(setUsluge(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* uslugeGet({ payload }) {
  const res = yield call(uslugeService.getUsluge, payload);
  yield put(setUsluge(res.data));

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* uslugaGet({ payload }) {
//   try {
//     const { data } = yield call(uslugeService.getUsluga, payload);
//     yield put(setUsluga(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* uslugaGet({ payload }) {
  const res = yield call(uslugeService.getUsluga, payload);
  yield put(setUsluga(res.data));

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* uslugaUpdate({ payload }) {
//   try {
//     const { data } = yield call(uslugeService.updateUsluga, payload);
//     put(setUsluga(data));
//     toast.info('Uspješno ažurirana usluga: ' + payload.naziv, toastSettings);
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* uslugaUpdate({ payload }) {
  const res = yield call(uslugeService.updateUsluga, payload);
  put(setUsluga(res.data));
  toast.info('Uspješno ažurirana usluga: ' + payload.naziv, toastSettings);

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* uslugaDelete({ payload }) {
//   try {
//     const obrisanaUsluga = yield select(stavkeUslugeSelector());
//     yield call(uslugeService.deleteUsluga, payload);
//     const { data } = yield call(uslugeService.getUsluge);
//     yield put(setUsluge(data));
//     toast.success(
//       'Uspješno obrisana usluga: ' +
//         obrisanaUsluga.data.find((u) => u.id === payload).naziv,
//       toastSettings
//     );
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* uslugaDelete({ payload }) {
  const obrisanaUsluga = yield select(stavkeUslugeSelector());
  yield call(uslugeService.deleteUsluga, payload);

  const res = yield call(uslugeService.getUsluge);
  yield put(setUsluge(res.data));
  toast.success(
    'Uspješno obrisana usluga: ' +
      obrisanaUsluga.data.find((u) => u.id === payload).naziv,
    toastSettings
  );
  yield put(setGlobalError(res.message));
}

// export function* poreziGet({ payload }) {
//   try {
//     const { data } = yield call(poreziService.getPorezi, payload);
//     yield put(setPorezi(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* poreziGet({ payload }) {
  const res = yield call(poreziService.getPorezi, payload);
  yield put(setPorezi(res.data));

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}
