import { combineReducers } from 'redux';
import errorReducer from './ErrorReducer';
import buyerReducer from './BuyerReducer';
import fizickaLicaReducer from './FizickaLicaReducer';
import partneriReducer from './PartneriReducer';
import userReducer from './UserReducer';
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  errorReducer,
  buyerReducer,
  fizickaLicaReducer,
  partneriReducer,
  userReducer,
})

export default createRootReducer
