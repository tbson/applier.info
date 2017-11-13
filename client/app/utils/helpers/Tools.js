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

	static parseJson(input){
		try{
			return JSON.parse(input);
		}catch(error){
			return String(input);
		}
	}

	static getStorage(key, defaultValue=null){
		let value = this.parseJson(localStorage.getItem(LOCAL_STORAGE_PREFIX + '_' + key));
		if(!value){
			value = defaultValue;
		}
		return value;
	}

	static setStorage(key, value){
		try{
			let newValue = value;
			if(key === 'authData'){
				newValue = {...this.getStorage(key), ...value};
			}
			newValue = JSON.stringify(newValue);
			localStorage.setItem(LOCAL_STORAGE_PREFIX + '_' + key, newValue);
		}catch(error){
			console.error(error);
		}
	}

	static removeStorage(key){
		localStorage.removeItem(LOCAL_STORAGE_PREFIX + '_' + key);
	}

	static getToken(){
		return this.getStorage('authData')?this.getStorage('authData').token:null;
	}
}
