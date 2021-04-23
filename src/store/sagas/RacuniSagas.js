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

// export function* racunStore() {
//   try {
//     const noviRacun = yield select(noviRacunSelector());
//     yield call(racuniService.storeRacun, noviRacun);
//     toast.success('Uspješno dodat gotovinski račun', toastSettings);
//     yield put(resetNoviRacun());
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* racunStore() {
  const noviRacun = yield select(noviRacunSelector());
  const res = yield call(racuniService.storeRacun, noviRacun);
  toast.success('Uspješno dodat gotovinski račun', toastSettings);

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(resetNoviRacun());
    yield put(setGlobalError(res.message));
  }
}

// export function* bezgotovinskiRacunStore({ payload }) {
//   try {
//     yield call(racuniService.storeBezgotovinskiRacun, payload);
//     toast.success('Uspješno dodat bezgotovinski račun', toastSettings);
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* bezgotovinskiRacunStore({ payload }) {
  const res = yield call(racuniService.storeBezgotovinskiRacun, payload);
  toast.success('Uspješno dodat bezgotovinski račun', toastSettings);

  if (res.status !== 201) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* racuniGet({ payload }) {
//   try {
//     const { data } = yield call(racuniService.getRacuni, payload);
//     console.log('data', data);
//     yield put(setRacuni(data));
//   } catch (error) {
//     yield put(setGlobalError(error));
//   }
// }

export function* racuniGet({ payload }) {
  const res = yield call(racuniService.getRacuni, payload);
  console.log('data', res.data);
  yield put(setRacuni(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* racunGet({ payload }) {
//   try {
//     const { data } = yield call(racuniService.getRacun, payload);
//     yield put(setRacun(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* racunGet({ payload }) {
  const res = yield call(racuniService.getRacun, payload);
  yield put(setRacun(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

// export function* racunUpdate({ payload }) {
//   try {
//     const { data } = yield call(racuniService.updateRacun, payload);
//     put(setRacun(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* racunUpdate({ payload }) {
  const res = yield call(racuniService.updateRacun, payload);
  put(setRacun(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}

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

// export function* atributiGrupeGet({ payload }) {
//   try {
//     const { data } = yield call(racuniService.getAtributiGrupe, payload);
//     yield put(setAtributiGrupe(data));
//   } catch (error) {
//     yield put(setGlobalError(error.message));
//   }
// }

export function* atributiGrupeGet({ payload }) {
  const res = yield call(racuniService.getAtributiGrupe, payload);
  yield put(setAtributiGrupe(res.data));

  if (res.status !== 200) {
    toast.error(
      'Greska: ' + res.status + 'Poruka: ' + res.message,
      toastSettings
    );
    yield put(setGlobalError(res.message));
  }
}
