import { call, put, select } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { robeService } from '../../services/RobeService';
import { setRoba, setRobe } from '../actions/RobeActions';
import { setStavkeRobe } from '../actions/RacuniActions';
import { racuniService } from '../../services/RacuniService';
import { stavkeRobeSelector } from '../selectors/RacuniSelector';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rest } from 'lodash-es';

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

// export function* robaStore({ payload }) {
//   try {
//     yield call(robeService.storeRoba, payload);
//     toast.success('Uspješno dodata roba: ' + payload.naziv, toastSettings);
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* robaStore({ payload }) {
  const res = yield call(robeService.storeRoba, payload);
  toast.success('Uspješno dodata roba: ' + payload.naziv, toastSettings);

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* robeGet({ payload }) {
//   try {
//     const { data } = yield call(robeService.getRobe, payload);
//     yield put(setRobe(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* robeGet({ payload }) {
  const res = yield call(robeService.getRobe, payload);
  yield put(setRobe(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* robaGet({ payload }) {
//   try {
//     const { data } = yield call(robeService.getRoba, payload);
//     yield put(setRoba(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* robaGet({ payload }) {
  const res = yield call(robeService.getRoba, payload);
  yield put(setRoba(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

export function* robaUpdate({ payload }) {
  const res = yield call(robeService.updateRoba, payload);
  put(setRoba(res.data));
  put(setStavkeRobe(res.data));
  toast.info('Uspješno ažurirana roba: ' + payload.naziv, toastSettings);

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

export function* robeDelete({ payload }) {
  let obrisanaRoba = yield select(stavkeRobeSelector());
  yield call(robeService.deleteRoba, payload);
  const res = yield call(robeService.getRobe);
  yield put(setRobe(res.data));
  // yield put(
  //   setStavkeRobe(
  //     obrisanaRoba.data.filter((roba) => roba.roba_id !== payload)
  //   )
  // );
  console.log('obrisanaRoba', obrisanaRoba);
  toast.success(
    'Uspješno obrisana roba: ' +
      obrisanaRoba.data.find((r) => r.roba_id === payload).roba.naziv,
    toastSettings
  );

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}
