import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers =
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     trace: true,
//     traceLimit: 25,
//   }) || compose;

const store = createStore(
  createRootReducer(history),
  {},
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export default store;
