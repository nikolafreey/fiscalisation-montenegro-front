import { combineReducers } from 'redux';
import errorReducer from './ErrorReducer';
import buyerReducer from './BuyerReducer';
import fizickaLicaReducer from './FizickaLicaReducer';
import partneriReducer from './PartneriReducer';
import userReducer from './UserReducer';
import preduzecaReducer from './PreduzecaReducer';
import routeReducer from './RouteReducer';
import uslugeReducer from './UslugeReducer';
import robeReducer from './RobeReducer';
import kategorijeRobeReducer from './KategorijeRobeReducer';
import atributiReducer from './AtributiReducer';
import { connectRouter } from 'connected-react-router';
import racuniReducer from './RacuniReducer';
import ulazniRacuniReducer from './UlazniRacuniReducer';
import predracuniReducer from './PredracuniReducer';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    errorReducer,
    buyerReducer,
    fizickaLicaReducer,
    partneriReducer,
    preduzecaReducer,
    userReducer,
    routeReducer,
    uslugeReducer,
    robeReducer,
    kategorijeRobeReducer,
    atributiReducer,
    racuniReducer,
    ulazniRacuniReducer,
    predracuniReducer,
  });

export default createRootReducer;
