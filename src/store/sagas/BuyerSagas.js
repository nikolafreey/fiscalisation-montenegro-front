
import { call, put } from 'redux-saga/effects';
import { setGlobalError } from '../actions/ErrorActions';
import { buyerService } from '../../services/BuyerService';
import {
  setBuyers
} from '../actions/BuyerActions';

export function* buyersGet() {
  try {
    const { data } = yield call(buyerService.getBuyers);
    yield put(setBuyers(data));
  } catch (error) {
    yield put(setGlobalError(error.message));
  }
}
