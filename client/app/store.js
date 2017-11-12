import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
	sagaMiddleware
];

// Create an object for the default data
const defaultState = {
	commonReducer: {
	}
};

const store = createStore(rootReducer, defaultState, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
export default store;
