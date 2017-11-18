// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router
} from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
// import createHistory from 'history/createBrowserHistory';
import enUS from 'antd/lib/locale-provider/en_US';
import constants from './constants';
import store from './store';
import History from 'helpers/History';
import App from './components/App';

// const history = createHistory({ basename: '/admin' });

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={History}>
			<LocaleProvider locale={enUS}>
				<App />
			</LocaleProvider>
		</ConnectedRouter>
	</Provider>
	, document.getElementById('app'));
