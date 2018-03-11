// @flow
// $FlowFixMe: do not complain about importing node_modules
import {combineReducers} from 'redux';
// $FlowFixMe: do not complain about importing node_modules
import {routerReducer as router} from 'react-router-redux';
import commonState from './commonReducer';
import authState from 'src/components/auth/reducer';

const rootReducer = combineReducers({
    router,
    commonState,
    authState,
});

export default rootReducer;
