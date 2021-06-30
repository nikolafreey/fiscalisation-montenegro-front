import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { preduzecaService } from '../../services/PreduzecaService';
import { setPreduzeca, setPreduzece } from '../actions/PreduzecaActions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authService } from '../../services/AuthService';
import { setUser } from '../actions/UserActions';

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

export function* preduzeceStore({ payload }) {
  try {
    const res = yield call(preduzecaService.storePreduzece, payload);
    toast.success(
      'Uspješno dodato preduzeće: ' + payload.kratki_naziv,
      toastSettings
    );
  } catch (error) {
    console.log('error', error.response);
    if (
      error.response.data.error.includes(
        'SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry'
      )
    ) {
      toast.error('Već postoji preduzeće sa unjetim PIB-om!', toastSettings);
      return;
    }
    yield put(setGlobalError(error.message));
  }
}

// export function* preduzeceStore({ payload }) {
//   const res = yield call(preduzecaService.storePreduzece, payload);
//   toast.success(
//     'Uspješno dodato preduzeće: ' + payload.kratki_naziv,
//     toastSettings
//   );

//   if (res.status !== 201) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* preduzecaGet({ payload }) {
  try {
    const res = yield call(preduzecaService.getPreduzeca, payload);
    yield put(setPreduzeca(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* preduzecaGet({ payload }) {
//   const res = yield call(preduzecaService.getPreduzeca, payload);
//   yield put(setPreduzeca(res.data));

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* preduzeceGet({ payload }) {
  try {
    const res = yield call(preduzecaService.getPreduzece, payload);
    yield put(setPreduzece(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* preduzeceGet({ payload }) {
//   const res = yield call(preduzecaService.getPreduzece, payload);
//   yield put(setPreduzece(res.data));

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* preduzeceUpdate({ payload }) {
  try {
    console.log('payload preduzece', payload);
    const res = yield call(preduzecaService.updatePreduzece, payload);
    if (res) {
      yield put(setPreduzece(res.data));
    }

    //Dodavanje u user state zbog podesavanja
    const { data } = yield call(authService.getUser);
    console.log('user data', data);
    yield put(setUser(data));

    toast.info(
      'Uspješno ažurirano preduzeće: ' + payload.kratki_naziv,
      toastSettings
    );
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* preduzeceUpdate({ payload }) {
//   const res = yield call(preduzecaService.updatePreduzece, payload);
//   yield put(setPreduzece(res.data));
//   toast.info('Uspješno ažurirano preduzeće: ' + payload.naziv, toastSettings);

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* preduzeceDelete({ payload }) {
  try {
    const res = yield call(preduzecaService.deletePreduzece, payload);
    toast.success('Uspješno obrisano preduzeće id: ' + payload, toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* preduzeceDelete({ payload }) {
//   const res = yield call(preduzecaService.deletePreduzece, payload);
//   toast.success('Uspješno obrisano preduzeće id: ' + payload, toastSettings);

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }
