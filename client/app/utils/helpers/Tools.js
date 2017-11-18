// @flow
import React from 'react';
import 'whatwg-fetch';
import Fingerprint2 from 'fingerprintjs2';
import forEach from 'lodash/forEach';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';
import isArray from 'lodash/isArray';
import has from 'lodash/has';
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
	static checkDevMode(): boolean {
		const domainArr = window.location.host.split('.');
		const suffix = domainArr[domainArr.length - 1];
		return ['dev'].indexOf(suffix) === -1 ? false : true;
	}

	static getApiBaseUrl(): string {
		return PROTOCOL + DOMAIN + API_PREFIX;
	}

	static navigateTo(url='/', params=[]) {
		return History.push([url, ...params].join('/'));
	}

	static parseJson(input: any): string {
		try {
			return JSON.parse(input);
		} catch(error) {
			return String(input);
		}
	}

	static getStorageObj(key: string): Object {
		try{
			let value = this.parseJson(localStorage.getItem(LOCAL_STORAGE_PREFIX + '_' + key));
			if(value && typeof value === 'object'){
				return value;
			}
			return {};
		}catch(error){
			return {};
		}
	}

	static getStorageStr(key: string): string{
		try{
			let value = localStorage.getItem(LOCAL_STORAGE_PREFIX + '_' + key);
			if(!value){
				return '';
			}
			return String(value);
		}catch(error){
			return '';
		}
	}

	static setStorage(key: string, value: any): void{
		try{
			let newValue = value;
			if(key === 'authData'){
				newValue = {...this.getStorageObj(key), ...value};
			}
			newValue = JSON.stringify(newValue);
			localStorage.setItem(LOCAL_STORAGE_PREFIX + '_' + key, newValue);
		}catch(error){
			console.error(error);
		}
	}

	static removeStorage(key: string): void{
		localStorage.removeItem(LOCAL_STORAGE_PREFIX + '_' + key);
	}

	static getToken(): string {
		const token = this.getStorageObj('authData').token;
		return token?token:'';
	}

	static getApiBaseUrl(): String{
		return PROTOCOL + DOMAIN + API_PREFIX;
	}

	static getApiUrls(rawApiUrls: Object): Object{
	    let result = {};
	    const API_BASE_URL = this.getApiBaseUrl();
	    forEach(rawApiUrls, (apiUrl, index) => {
    		forEach(apiUrl.endpoints, (url, key) => {
    			result[index === 0 ? camelCase(key) : camelCase(apiUrl.controller+'-'+key)] = API_BASE_URL + snakeCase(apiUrl.controller).replace(/_/g, '-') + '/' + url + (url?'/':'');
    		});
	    });
	    return result;
	}

	static toggleGlobalLoading(spinning: boolean = true): void {
		const action = {
			type: 'TOGGLE_SPINNER',
			spinning
		}
		store.dispatch(action);
	}

	static async getFingerPrint(): Promise<string>{
		const result = await new Promise(function(resolve, reject){
			new Fingerprint2().get((newFingerprint) => {
				fingerprint = newFingerprint;
				resolve(newFingerprint);
			});
		});
		return result;
	}

	static paramsProcessing(params: Object): Object{
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
			return {};
		}
	}

	static urlDataEncode(obj: Object): string {
		let str = [];
		for(let p in obj){
			if (has(obj, p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
		}
		return str.join("&");
	}

	static urlDataDecode(str: string): Object {
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

	static errorMessageProcessing(input: string | Object): string {
		if(typeof input === 'string'){
			// If message is STRING
			return String(input);
		}else if(isArray(input)){
			// If message is ARRAY
			return String(input.join('<br/>'));
		}else if(typeof input === 'object'){
			// If detail key exist with string style
			if(typeof input.detail === 'string'){
				return input.detail;
			}
			if(typeof input.non_field_errors !== 'undefined'){
				return String(input.non_field_errors);
			}
			return '';
		}else{
			return '';
		}
	}

	static errorToast = (description: string, title: string=''): void => {
		notification['error']({
			message: title,
			description: description,
		});
	};

	static successToast = (description: string, title: string=''):void => {
		notification['success']({
			message: title,
			description: description,
		});
	};

	static popMessage(description: string | Object, title: string='', type: string='success'): void {
		const messages = this.errorMessageProcessing(description);
		console.log(messages);
		if(!messages) return;

		if(type === 'success'){
			this.successToast(messages, title?title:'Success!');
		}else{
			this.errorToast(messages, title?title:'Error!');
		}
	}

	static async apiCall(
		url: string,
		method: string,
		params: Object = {},
		popMessage: bool = true,
		usingLoading: bool = true): Promise<{status: number, success: boolean, data: Object}> {
		try{
			if(usingLoading){
				this.toggleGlobalLoading();
			}
			let requestConfig: Object = {
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
			console.error(error);
			if(usingLoading){
				this.toggleGlobalLoading(false);
			}
			return {
				status: 400,
				success: false,
				data: error
			}
		}
	}
}
