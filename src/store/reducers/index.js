import { combineReducers } from 'redux';
import errorReducer from './ErrorReducer';
import buyerReducer from './BuyerReducer';
import fizickaLicaReducer from './FizickaLicaReducer';
import partneriReducer from './PartneriReducer';
import userReducer from './UserReducer';
import preduzecaReducer from './PreduzecaReducer';

export default combineReducers({
  errorReducer,
  buyerReducer,
  fizickaLicaReducer,
  partneriReducer,
  userReducer,
  preduzecaReducer,
});
