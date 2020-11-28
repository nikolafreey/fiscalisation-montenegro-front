import produce from 'immer';
import {
  SET_REQUESTED_ROUTE,
} from '../actionTypes/RouteActionTypes';

const initialState = {
  requestedRoute: null,
};

const routeReducer = (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_REQUESTED_ROUTE:
        draft.requestedRoute = action.payload;
        break;
      default:
        break;
    }
  });

export default routeReducer;