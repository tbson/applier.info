import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import constants from './constants';
import {History} from 'src/constants';
import App from './components/App';

ReactDOM.render(
    <Router history={History}>
        <App />
    </Router>,
    document.getElementById('app'),
);
