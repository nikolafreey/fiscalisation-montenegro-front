
import { all, takeLatest } from 'redux-saga/effects';
import { GET_BUYERS } from '../actionTypes/BuyerActionTypes';
import { buyersGet } from './BuyerSagas';

export default function* rootSaga() {
  yield all([
    takeLatest(GET_BUYERS, buyersGet),
  ]);
}