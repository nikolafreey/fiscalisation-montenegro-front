import { call, put, select } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { partneriService } from '../../services/PartneriService';
import { setPartner, setPartneri } from '../actions/PartneriActions';
import { getPreduzeca } from '../actions/PreduzecaActions';
import { preduzecaSelector } from '../selectors/PreduzecaSelector';

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

export function* partnerStore({ payload }) {
  try {
    const res = yield call(partneriService.storePartner, payload);

    if (payload.preduzece_id) {
      const preduzeca = yield select(preduzecaSelector());
      yield put(getPreduzeca({ page: preduzeca.current_page }));
    }
    toast.success('Uspješno dodat partner', toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* partnerStore({ payload }) {
//   const res = yield call(partneriService.storePartner, payload);

//   if (payload.preduzece_id) {
//     const preduzeca = yield select(preduzecaSelector());
//     yield put(getPreduzeca({ page: preduzeca.current_page }));
//   }
//   toast.success('Uspješno dodat partner', toastSettings);

//   if (res.status !== 201) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* partneriGet({ payload }) {
  try {
    const res = yield call(partneriService.getPartneri, payload);
    yield put(setPartneri(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* partneriGet({ payload }) {
//   const res = yield call(partneriService.getPartneri, payload);
//   yield put(setPartneri(res.data));

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* partnerGet({ payload }) {
  try {
    const res = yield call(partneriService.getPartner, payload);
    yield put(setPartner(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* partnerGet({ payload }) {
//   const res = yield call(partneriService.getPartner, payload);
//   yield put(setPartner(res.data));

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* partnerUpdate({ payload }) {
  try {
    const res = yield call(partneriService.updatePartner, payload);
    put(setPartner(res.data));
    toast.info('Uspješno ažuriran partner: ' + payload.naziv, toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* partnerUpdate({ payload }) {
//   const res = yield call(partneriService.updatePartner, payload);
//   put(setPartner(res.data));
//   toast.info('Uspješno ažuriran partner: ' + payload.naziv, toastSettings);

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* partnerDelete({ payload }) {
  try {
    const obrisaniPartner = yield select(partneriSelector);
    const res = yield call(partneriService.deletePartner, payload);
    toast.success('Uspješno obrisan partner', toastSettings);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* partnerDelete({ payload }) {
//   const obrisaniPartner = yield select(partneriSelector);
//   const res = yield call(partneriService.deletePartner, payload);
//   toast.success('Uspješno obrisan partner', toastSettings);
//   // toast.success(
//   //   'Uspješno obrisan partner' +
//   //     obrisaniPartner.data.find((r) => r.id === payload).naziv,
//   //   toastSettings
//   // );

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }
