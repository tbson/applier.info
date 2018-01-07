// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import commonReducer from './commonReducer';
import authReducer from 'components/auth/reducer';
import configReducer from 'components/config/reducer';

const rootReducer = combineReducers({
    router,
    commonReducer,
    authReducer,
    configReducer
});

export default rootReducer;
