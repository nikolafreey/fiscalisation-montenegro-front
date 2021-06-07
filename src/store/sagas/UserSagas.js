import { push } from 'connected-react-router';
import { call, put, select } from 'redux-saga/effects';
import { AUTH, HOME, RACUNI, PREGLED } from '../../constants/routes';
import { authService } from '../../services/AuthService';
import { setGlobalError, setLoginError } from '../actions/ErrorActions';
import { setRequestedRoute } from '../actions/RouteActions';
import { getUser, setUser } from '../actions/UserActions';
import { requestedRouteSelector } from '../selectors/RouteSelector';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const initialState = {
  globalError: null,
  loginError: {},
};

const toastSettings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export function* userGet() {
  try {
    const { data } = yield call(authService.getUser);
    yield put(setUser(data));
  } catch (error) {
    yield call(authService.setAuthenticatedStorage, false);
    yield put(setGlobalError(error.message));
  }
}

export function* userLogin({ payload }) {
  try {
    yield put(setLoginError({}));
    yield call(authService.getCsrfCookie);
    const { data } = yield call(authService.login, payload);
    if (data === 'Neuspješna prijava!') {
      toast.error('Nije moguć ulazak: ' + data, toastSettings);
      return;
    }
    yield call(authService.setAuthenticatedStorage, true, data.data.token);
    yield put(getUser());

    const requestedRoute = yield select(requestedRouteSelector());
    yield put(push(requestedRoute || PREGLED.INDEX));
    yield put(setRequestedRoute(null));
  } catch (error) {
    if (error?.response?.status === 422) {
      yield put(setLoginError(error?.response?.data));
    } else {
      yield put(setGlobalError(error.message));
    }
  }
}

export function* userLogout() {
  try {
    yield call(authService.logout);
    yield call(authService.setAuthenticatedStorage, false);
    yield put(setUser(null));
    yield put(push(AUTH.LOGIN));
  } catch (error) {
    console.log('error', error);
    yield put(setGlobalError(error));
  }
}

export function* userForgotPassword({ payload }) {
  try {
    yield call(authService.forgotPassword, payload);
    yield put(push(AUTH.FORGOT_SUCCESS));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

export function* userResetPassword({ payload }) {
  try {
    yield call(authService.resetPassword, payload);
    yield put(push(AUTH.RESET_SUCCESS));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
