import React from 'react';
import 'whatwg-fetch';
import Fingerprint2 from 'fingerprintjs2';
import forEach from 'lodash/forEach';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import isArray from 'lodash/isArray';
import { notification } from 'antd';
import History from './History';
import store from 'app/store';

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

	static navigateTo(url='/', params=[]){
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

	static getApiBaseUrl(){
		return PROTOCOL + DOMAIN + API_PREFIX;
	}

	static getApiUrls(rawApiUrls){
	    let result = {};
	    const API_BASE_URL = this.getApiBaseUrl();
	    forEach(rawApiUrls, (apiUrl, index) => {
    		forEach(apiUrl.endpoints, (url, key) => {
    			result[index === 0 ? camelCase(key) : camelCase(apiUrl.controller+'-'+key)] = API_BASE_URL + snakeCase(apiUrl.controller).replace(/_/g, '-') + '/' + url + (url?'/':'');
    		});
	    });
	    return result;
	}

	static toggleGlobalLoading(spinning=true){
		const action = {
			type: 'TOGGLE_SPINNER',
			spinning
		}
		store.dispatch(action);
	}

	static async getFingerPrint(){
		const result = await new Promise(function(resolve, reject){
			new Fingerprint2().get((newFingerprint) => {
				fingerprint = newFingerprint;
				resolve(newFingerprint);
			});
		});
		return result;
	}

	static paramsProcessing(params){
		try{
			let requireFormData = false;
			forEach(params, (value, key) => {
				if(key !== 'id'){
					if(value && typeof value === 'object'){
						try{
							value.item(0);
							requireFormData = true;
						}catch(error){
							// Nothing change
						}
					}
				}
			});
			if(!requireFormData){
				return {
					data: JSON.stringify(params),
					contentType: "application/json"
				}
			}

			let formData = new FormData();
			forEach(params, (value, key) => {
				if(value && typeof value === 'object'){
					if(value.length){
						try{
							formData.set(key, value.item(0));
						}catch(error){
							formData.set(key, JSON.stringify(value));
						}
					}
				}else{
					formData.set(key, value);
				}
			});
			return {
				data: formData,
				contentType: null
			}
		}catch(error){
			console.error(error);
		}
	}

	static urlDataEncode(obj) {
		let str = [];
		for(let p in obj){
			if (has(obj, p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		}
		return str.join("&");
	}

	static urlDataDecode(str){
		// str = abc=def&ghi=aaa&ubuntu=debian
		let result = {};
		let arr = str.split('&');
		if(!str){
			return result;
		}
		forEach(arr, (value) => {
			let arrValue = value.split('=');
			if(arrValue.length===2){
				result[arrValue[0]] = arrValue[1];
			}
		});
		return result;
	}

	static errorMessageProcessing(input){
		if(typeof input === 'string' || isArray(input)){
			// If message is STRING or ARRAY
			return input;
		}else if(typeof input === 'object'){
			// If detail key exist with string style
			if(typeof input.detail === 'string'){
				return input.detail;
			}
			if(typeof input.non_field_errors !== 'undefined'){
				return input.non_field_errors;
			}
			return null
		}
		return null;
	}

	static errorToast = (description, title='') => {
		notification['error']({
			message: title,
			description: description,
		});
	};

	static successToast = (description, title='') => {
		notification['success']({
			message: title,
			description: description,
		});
	};

	static popMessage(description, title='', type='success'){
		const messages = this.errorMessageProcessing(description);
		console.log(messages);
		if(!messages) return;

		if(type === 'success'){
			this.successToast(messages, title?title:'Success!');
		}else{
			this.errorToast(messages, title?title:'Error!');
		}
	}

	static async apiCall(url, method, params={}, popMessage=true, usingLoading=true){
		try{
			if(usingLoading){
				this.toggleGlobalLoading();
			}
			let requestConfig = {
				method: method,
				headers: {
					"Content-Type": "application/json",
            		// "Authorization": "Bearer " + this.getToken(),
            		"Authorization": "JWT " + this.getToken(),
					"fingerprint": await this.getFingerPrint()
				},
				credentials: "same-origin"
			};
			if(['POST', 'PUT'].indexOf(method) !== -1){
				// Have payload
				params = this.paramsProcessing(params);
				requestConfig.body = params.data;
				if(!params.contentType){
					delete requestConfig.headers['Content-Type'];
				}
			}else{
				// No payload but url encode
				if(url.indexOf('?') === -1){
					url += '?' + this.urlDataEncode(params);
				}
			}
			let response = await fetch(url, requestConfig);
			let data = {};
			try{
				data = await response.json();
			}catch(error){
				console.error(error);
			}
			if(usingLoading){
				this.toggleGlobalLoading(false);
			}
			if(isArray(data)){
				data = {
					count: data.length,
					items: data,
					links: {
						next: null,
						previous: null
					},
					page_size: data.length,
					pages: 1
				}
			}
			let result = {
				status: response.status,
				success: [200, 201, 204].indexOf(response.status) === -1 ? false : true,
				data
			};
			if([200, 201, 204].indexOf(result.status) === -1){
				this.popMessage(result.data, '', 'error');
			}
			return result;
		}catch(error){
			if(usingLoading){
				this.toggleGlobalLoading(false);
			}
			console.error(error);
			return error;
		}
	}
}
