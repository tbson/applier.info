import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import constants from './constants';
import store from './store';
import App from './components/App';


ReactDOM.render(
	<Provider store={store}>
		<Router basename="/admin">
			<LocaleProvider locale={enUS}>
				<App />
			</LocaleProvider>
		</Router>
	</Provider>
	, document.getElementById('app'));
