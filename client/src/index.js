import React from 'react';
import ReactDOM from 'react-dom';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import constants from './constants';
import store from './store';
import {History} from 'src/constants';
import App from './components/App';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={History}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'),
);
