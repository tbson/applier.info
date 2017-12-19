// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'helpers/Tools';
import rootReducer from './reducers';

const routeMiddleware = routerMiddleware(History);

const middlewares = [
	routeMiddleware
];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
