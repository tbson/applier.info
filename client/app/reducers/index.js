import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import commonReducer from './commonReducer';

const rootReducer = combineReducers({
	router,
	commonReducer
});

export default rootReducer;
