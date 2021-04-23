import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { grupeService } from '../../services/GrupeService';
import { setGrupa, setGrupe } from '../actions/GrupeActions';

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

export function* grupaStore({ payload }) {
  const res = yield call(grupeService.storeGrupa, payload);
  yield put(grupeService.getGrupe);

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* grupeGet({ payload }) {
//   try {
//     const { data } = yield call(grupeService.getGrupe, payload);
//     yield put(setGrupe(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* grupeGet({ payload }) {
  const res = yield call(grupeService.getGrupe, payload);
  yield put(setGrupe(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

export function* grupaGet({ payload }) {
  const res = yield call(grupeService.getGrupa, payload);
  yield put(setGrupa(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

export function* grupaUpdate({ payload }) {
  const res = yield call(grupeService.updateGrupa, payload);
  put(setGrupa(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

export function* grupaDelete({ payload }) {
  const res = yield call(grupeService.deleteGrupa, payload);

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}
