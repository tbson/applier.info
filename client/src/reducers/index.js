// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import commonState from './commonReducer';
import authState from 'src/components/auth/reducer';
import configState from 'src/components/config/reducer';

const rootReducer = combineReducers({
    router,
    commonState,
    authState,
    configState
});

export default rootReducer;
