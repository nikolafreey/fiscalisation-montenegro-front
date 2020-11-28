
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(createRootReducer(history), {},
  compose(
    applyMiddleware(
      routerMiddleware(history), sagaMiddleware
    ),
  )  

);
sagaMiddleware.run(rootSaga);

export default store;