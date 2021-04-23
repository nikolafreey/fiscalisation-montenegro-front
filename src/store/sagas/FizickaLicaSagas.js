import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { fizickaLicaService } from '../../services/FizickaLicaService';
import { setFizickaLica, setFizickoLice } from '../actions/FizickaLicaActions';

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

export function* fizickoLiceStore({ payload }) {
  const res = yield call(fizickaLicaService.storeFizickoLice, payload);
  toast.success(
    'Uspješno dodato fizičko lice: ' + payload?.ime + ' ' + payload?.prezime,
    toastSettings
  );

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

export function* fizickaLicaGet({ payload }) {
  const res = yield call(fizickaLicaService.getFizickaLica, payload);
  yield put(setFizickaLica(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* fizickoLiceGet({ payload }) {
//   try {
//     const { data } = yield call(fizickaLicaService.getFizickoLice, payload);
//     yield put(setFizickoLice(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* fizickoLiceGet({ payload }) {
  const res = yield call(fizickaLicaService.getFizickoLice, payload);
  yield put(setFizickoLice(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

export function* fizickoLiceUpdate({ payload }) {
  const res = yield call(fizickaLicaService.updateFizickoLice, payload);
  put(setFizickoLice(res.data));
  toast.info(
    'Uspješno ažurirano fizičko lice: ' + payload?.ime + ' ' + payload?.prezime,
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

export function* fizickoLiceDelete({ payload }) {
  const res = yield call(fizickaLicaService.deleteFizickoLice, payload);
  toast.success('Uspješno obrisano fizičko lice: ' + payload, toastSettings);

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}
