import React from 'react';
import 'whatwg-fetch';
import History from './History';

import {
	LOCAL_STORAGE_PREFIX,
	URL_PREFIX,
	API_PREFIX,
	PROTOCOL,
	DOMAIN,
	FIELD_TYPE
} from 'app/constants';

let fingerprint = null;

export default class Tools {
	static checkDevMode(){
		const domainArr = window.location.host.split('.');
		const suffix = domainArr[domainArr.length - 1];
		return ['dev'].indexOf(suffix) === -1 ? false : true;
	}

	static getApiBaseUrl(){
		return PROTOCOL + DOMAIN + API_PREFIX;
	}

	static navigateTo(url, params){
		return History.push([url, ...params].join('/'));
	}
}
