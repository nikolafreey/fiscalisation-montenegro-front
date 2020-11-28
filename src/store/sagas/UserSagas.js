
import { push } from 'connected-react-router';
import { call, put } from 'redux-saga/effects';
import { HOME } from '../../constants/routes';
import { authService } from '../../services/AuthService';
import { setGlobalError, setLoginError } from '../actions/ErrorActions';
import { getUser, setUser } from '../actions/UserActions';

export function* userGet() {
  try {
    
    const { data } = yield call(authService.getUser);
    yield put(setUser(data));
  } catch (error) {
    yield call(authService.setAuthenticatedStorage(false));
    yield put(setGlobalError(error.message));
  }
}

export function* userLogin({ payload }) {
  try {
    yield put(setLoginError({}));
    yield call(authService.getCsrfCookie);
    yield call(authService.login, payload);
    yield call(authService.setAuthenticatedStorage, true);
    yield put(getUser());
    yield put(push(HOME));
  } catch (error) {
    if (error.response.status === 422) {
      yield put(setLoginError(error.response.data));
    } else {
    yield put(setGlobalError(error.message));
    }
  }
}

export function* userLogout() {
  try {
    yield call(authService.setAuthenticatedStorage, false);
    yield put(setUser(null));
    yield call(authService.logout);
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}

