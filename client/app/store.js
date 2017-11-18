// @flow
import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'helpers/Tools';
import rootReducer from './reducers';
import rootSaga from './sagas';

const routeMiddleware = routerMiddleware(History);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
	sagaMiddleware,
	routeMiddleware
];

const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
export default store;
