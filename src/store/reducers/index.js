import { combineReducers } from 'redux';
import errorReducer from './ErrorReducer';
import buyerReducer from './BuyerReducer';
import fizickaLicaReducer from './FizickaLicaReducer';

export default combineReducers({
  errorReducer,
  buyerReducer,
  fizickaLicaReducer
});