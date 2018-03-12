// @flow
// $FlowFixMe: do not complain about importing node_modules
import {combineReducers} from 'redux';
// $FlowFixMe: do not complain about importing node_modules
import {routerReducer as router} from 'react-router-redux';
import commonState from './commonReducer';

const rootReducer = combineReducers({
    router,
    commonState
});

export default rootReducer;
