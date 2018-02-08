// @flow
// $FlowFixMe: do not complain about importing node_modules
import {combineReducers} from 'redux';
// $FlowFixMe: do not complain about importing node_modules
import {routerReducer as router} from 'react-router-redux';
import commonState from './commonReducer';
import authState from 'src/components/auth/reducer';
import configState from 'src/components/config/reducer';

const rootReducer = combineReducers({
    router,
    commonState,
    authState,
    configState,
});

export default rootReducer;
