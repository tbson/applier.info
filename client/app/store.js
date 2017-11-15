import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers';
import rootSaga from './sagas';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
	sagaMiddleware,
	routeMiddleware
];

// Create an object for the default data
const defaultState = {
	commonReducer: {
		spinning: false
	},
	authReducer: {
		resetForm: {
			FormLogin: 0
		},
		login: {
			email: null,
			password: null
		}, profile: {
			email: null,
			first_name: null,
			last_name: null,
			role_id: null
		}
	},
};

const store = createStore(rootReducer, defaultState, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
export default store;
