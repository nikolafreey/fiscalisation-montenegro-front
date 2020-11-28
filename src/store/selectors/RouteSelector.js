import { createSelector } from 'reselect';

const routeStateSelector = state => state.routeReducer;

export const requestedRouteSelector = () =>
  createSelector(routeStateSelector, routes => routes.requestedRoute);