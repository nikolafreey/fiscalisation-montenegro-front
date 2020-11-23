import { combineReducers } from 'redux';
import errorReducer from './ErrorReducer';
import buyerReducer from './BuyerReducer';

export default combineReducers({
  errorReducer,
  buyerReducer
});