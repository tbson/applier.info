// @flow
// $FlowFixMe: do not complain about importing node_modules
import {createStore, compose, applyMiddleware} from 'redux';
// $FlowFixMe: do not complain about importing node_modules
import {routerMiddleware} from 'react-router-redux';
import {History} from './constants';
import rootReducer from './reducers';
const routeMiddleware = routerMiddleware(History);

const middlewares = [routeMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
