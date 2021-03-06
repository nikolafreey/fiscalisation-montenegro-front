import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { kategorijeRobeService } from '../../services/KategorijeRobeService';
import {
  getKategorijeRobe,
  setKategorijeRobe,
  setPodkategorijeRobe,
} from '../actions/KategorijeRobeActions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { partneriSelector } from '../selectors/PartneriSelector';

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

export function* kategorijaRobeStore({ payload }) {
  try {
    const res = yield call(kategorijeRobeService.storeKategorijaRobe, payload);
    yield put(getKategorijeRobe());
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* kategorijaRobeStore({ payload }) {
//   const res = yield call(kategorijeRobeService.storeKategorijaRobe, payload);
//   yield put(getKategorijeRobe());

//   if (res.status !== 201) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* kategorijeRobeGet({ payload }) {
  try {
    const res = yield call(kategorijeRobeService.getKategorijeRobe, payload);
    yield put(setKategorijeRobe(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* kategorijeRobeGet({ payload }) {
//   const res = yield call(kategorijeRobeService.getKategorijeRobe, payload);
//   yield put(setKategorijeRobe(res.data));

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* podkategorijaRobeStore({ payload }) {
  try {
    const res = yield call(
      kategorijeRobeService.storePodkategorijaRobe,
      payload
    );
    yield put(getKategorijeRobe());
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* podkategorijaRobeStore({ payload }) {
//   const res = yield call(kategorijeRobeService.storePodkategorijaRobe, payload);
//   yield put(getKategorijeRobe());

//   if (res.status !== 201) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* podkategorijeRobeGet({ payload }) {
  try {
    const res = yield call(kategorijeRobeService.getPodkategorijeRobe, payload);
    yield put(setPodkategorijeRobe(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* podkategorijeRobeGet({ payload }) {
//   const res = yield call(kategorijeRobeService.getPodkategorijeRobe, payload);
//   yield put(setPodkategorijeRobe(res.data));

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }
