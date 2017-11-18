// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import commonReducer from './commonReducer';
import authReducer from 'components/auth/reducer';

const rootReducer = combineReducers({
	router,
	commonReducer,
	authReducer
});

export default rootReducer;
