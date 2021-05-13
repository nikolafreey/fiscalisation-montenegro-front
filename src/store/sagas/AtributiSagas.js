import { call, put, select } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { atributiService } from '../../services/AtributiService';
import {
  getTipoviAtributa,
  setAtributi,
  setTipAtributa,
  setTipoviAtributa,
} from '../actions/AtributiActions';
import { tipAtributaSelector } from '../selectors/AtributiSelector';

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

// export function* atributStore({ payload }) {
//   const tipAtributa = yield call(atributiService.storeAtribut, payload);
//   yield put(getTipoviAtributa());
//   const tipAtributaState = yield select(tipAtributaSelector());
//   yield put(
//     setTipAtributa({
//       ...tipAtributaState,
//       atributi: [...tipAtributaState.atributi, tipAtributa.data],
//     })
//   );

//   if (tipAtributa.status !== 201) {
//     toast.error(
//       'Greska: ' + tipAtributa.status + 'Poruka: ' + tipAtributa.message,
//       toastSettings
//     );
//     yield put(setGlobalError(tipAtributa.message));
//   }
// }

export function* atributStore({ payload }) {
  try {
    const tipAtributa = yield call(atributiService.storeAtribut, payload);
    yield put(getTipoviAtributa());
    const tipAtributaState = yield select(tipAtributaSelector());
    yield put(
      setTipAtributa({
        ...tipAtributaState,
        atributi: [...tipAtributaState.atributi, tipAtributa.data],
      })
    );
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* atributiGet({ payload }) {
//   const res = yield call(atributiService.storeTipAtributa, payload);
//     yield put(getTipoviAtributa());

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* atributiGet({ payload }) {
  try {
    const res = yield call(atributiService.storeTipAtributa, payload);
    yield put(getTipoviAtributa());
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* tipAtributaStore({ payload }) {
//   const res = yield call(atributiService.storeTipAtributa, payload);
//   yield put(getTipoviAtributa());

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* tipAtributaStore({ payload }) {
  try {
    const res = yield call(atributiService.storeTipAtributa, payload);
    yield put(getTipoviAtributa());
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

// export function* tipoviAtributaGet({ payload }) {
//   const res = yield call(atributiService.getTipoviAtributa, payload);
//   yield put(setTipoviAtributa(res.data));

//   if (res.status !== 200) {
//     toast.error(
//       'Greska: ' + res.status + 'Poruka: ' + res.message,
//       toastSettings
//     );
//     yield put(setGlobalError(res.message));
//   }
// }

export function* tipoviAtributaGet({ payload }) {
  try {
    const res = yield call(atributiService.getTipoviAtributa, payload);
    yield put(setTipoviAtributa(res.data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
