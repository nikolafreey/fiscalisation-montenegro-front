import { call, put, select } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { racuniService } from '../../services/RacuniService';
import {
  resetNoviRacun,
  setAtributiGrupe,
  setRacun,
  setRacuni,
  setStavkeRobe,
  setStavkeUsluge,
} from '../actions/RacuniActions';
import { noviRacunSelector } from '../selectors/RacuniSelector';
import { emptyPaginated } from '../reducers/RacuniReducer';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { robeService } from '../../services/RobeService';
import { rest } from 'lodash-es';
import { push } from 'connected-react-router';

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

export function* racunStore({ payload }) {
  try {
    localStorage.setItem('previousUrl', window.location.pathname);
    let noviRacun = yield select(noviRacunSelector());
    let noviRacunTemp = {
      ...noviRacun,
      nacin_placanja: payload.nacin_placanja //
        ? payload.nacin_placanja
        : 'BANKNOTE',
    };
    const res = yield call(racuniService.storeRacun, noviRacunTemp);
    toast.success(
      'Uspješno dodat gotovinski račun sa rednim brojem: ' +
        res.data.redni_broj,
      toastSettings
    );
    yield put(push('/racuni/show/' + res.data.id));
    yield put(resetNoviRacun());
  } catch (error) {
    yield put(resetNoviRacun());
    yield put(setGlobalError(error.message));
  }
}

// export function* racunStore({ payload }) {
//   let noviRacun = yield select(noviRacunSelector());
//   let noviRacunTemp = {
//     ...noviRacun,
//     nacin_placanja: payload.nacin_placanja //
//       ? payload.nacin_placanja
//       : 'BANKNOTE',
//   };
//   const res = yield call(racuniService.storeRacun, noviRacunTemp);
//   toast.success('Uspješno dodat gotovinski račun', toastSettings);

//   if (res.status !== 201) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(resetNoviRacun());
//     yield put(setGlobalError(res.message));
//   }
// }

export function* bezgotovinskiRacunStore({ payload }) {
  try {
    localStorage.setItem('previousUrl', window.location.pathname);
    const res = yield call(racuniService.storeBezgotovinskiRacun, payload);
    yield put(push('/racuni/bezgotovinski/show/' + res.data.id));
    toast.success(
      'Uspješno dodat bezgotovinski račun sa rednim brojem: ' +
        res.data.redni_broj,
      toastSettings
    );
    yield put(setRacun({}));
  } catch (error) {
    if (error.response.data.error.length > 50) {
      yield put(setGlobalError('Greška: Fiskalizacija nije uspješna!'));
      return;
    }
    yield put(setGlobalError(error.response.data.error));
    yield put(setRacun({}));
  }
}

// export function* bezgotovinskiRacunStore({ payload }) {
//   const res = yield call(racuniService.storeBezgotovinskiRacun, payload);
//   toast.success('Uspješno dodat bezgotovinski račun', toastSettings);

//   if (res.status !== 201) {
//     // toast.error(
//     //   'Greska: ' + res.status + 'Poruka: ' + res.message,
//     //   toastSettings
//     // );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* racuniGet({ payload }) {
  try {
    const res = yield call(racuniService.getRacuni, payload);
    yield put(setRacuni(res.data));
  } catch (error) {
    yield put(setGlobalError(error));
  }
}

// export function* racuniGet({ payload }) {
//   const res = yield call(racuniService.getRacuni, payload);
//   yield put(setRacuni(res.data));

//   if (res.status !== 200) {
//     // toast.error(
//     //   'Greska: ' + res.status + 'Poruka: ' + res.message,
//     //   toastSettings
//     // );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* racunGet({ payload }) {
  try {
    const res = yield call(racuniService.getRacun, payload);
    yield put(setRacun(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* racunGet({ payload }) {
//   const res = yield call(racuniService.getRacun, payload);
//   yield put(setRacun(res.data));

//   if (res.status !== 200) {
//     // toast.error(
//     //   'Greska: ' + res.status + 'Poruka: ' + res.message,
//     //   toastSettings
//     // );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* racunUpdate({ payload }) {
  try {
    const res = yield call(racuniService.updateRacun, payload);
    put(setRacun(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* racunUpdate({ payload }) {
//   const res = yield call(racuniService.updateRacun, payload);
//   put(setRacun(res.data));

//   if (res.status !== 200) {
//     // toast.error(
//     //   'Greska: ' + res.status + 'Poruka: ' + res.message,
//     //   toastSettings
//     // );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* racunDelete({ payload }) {
  try {
    yield call(racuniService.deleteRacun, payload);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* stavkeGet({ payload }) {
  try {
    if (payload?.grupa_id) {
      yield put(setStavkeRobe(emptyPaginated));
    } else {
      const robeResponse = yield call(racuniService.getRobe, payload);
      console.log('setStavkeRobe robeResponse', robeResponse.data);
      const samoRobeResponse = yield call(robeService.getRobe, payload);
      console.log('setStavkeRobe samoRobeResponse', samoRobeResponse.data);

      yield put(setStavkeRobe(robeResponse.data));
    }
    if (payload?.atribut_id || payload?.tip_atributa_id) {
      yield put(setStavkeUsluge(emptyPaginated));
    } else {
      const uslugeResponse = yield call(racuniService.getUsluge, payload);
      yield put(setStavkeUsluge(uslugeResponse.data));
    }
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* atributiGrupeGet({ payload }) {
  try {
    const res = yield call(racuniService.getAtributiGrupe, payload);
    yield put(setAtributiGrupe(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* atributiGrupeGet({ payload }) {
//   const res = yield call(racuniService.getAtributiGrupe, payload);
//   yield put(setAtributiGrupe(res.data));

//   if (res.status !== 200) {
//     // toast.error(
//     //   'Greska: ' + res.status + 'Poruka: ' + res.message,
//     //   toastSettings
//     // );
//     yield put(setGlobalError(res.message));
//   }
// }
