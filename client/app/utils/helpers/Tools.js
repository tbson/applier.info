// @flow
import React from 'react';
import Fingerprint2 from 'fingerprintjs2';
import { createBrowserHistory } from 'history';
import store from 'app/store';

import {
	LOCAL_STORAGE_PREFIX,
	URL_PREFIX,
	API_PREFIX,
	PROTOCOL,
	DOMAIN,
	FIELD_TYPE,
	URL_PREFIX_STRIP
} from 'app/constants';

let fingerprint = null;
export const History = createBrowserHistory({ basename: URL_PREFIX_STRIP });


type rawApiUrlsType = [{
    controller: string,
    endpoints: {}
}];

export default class Tools {
	static checkDevMode():boolean {
		const domainArr = window.location.host.split('.');
		const suffix = domainArr[domainArr.length - 1];
		return ['dev'].indexOf(suffix) === -1 ? false : true;
    }

    static snakeCase (str: string): string {
        var upperChars = str.match(/([A-Z])/g);
        if (! upperChars) {
            return str;
        }

        var str = str.toString();
        for (var i = 0, n = upperChars.length; i < n; i++) {
            str = str.replace(new RegExp(upperChars[i]), '_' + upperChars[i].toLowerCase());
        }

        if (str.slice(0, 1) === '_') {
            str = str.slice(1);
        }

        return str;
    };

    static camelCase(s: string): string {
        return s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});
    }

    static cap(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static toggleGlobalLoading(spinning: boolean = true): void {
		const action = {
			type: 'TOGGLE_SPINNER',
			payload: {
				spinning
			}
		}
		store.dispatch(action);
    }

    static formDataToObj (formTarget: HTMLFormElement) {
        const formData = new FormData(formTarget);
        let data = {};
        for (let pair of formData.entries()){
            data[pair[0]] = pair[1];
        }
        return data;
    }

	static getApiBaseUrl(): string {
		return PROTOCOL + DOMAIN + API_PREFIX;
	}

    static navigateTo(url:string = '/', params:Array<mixed> = []) {
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
        Object.entries(rawApiUrls).forEach(([index, apiUrl]) => {
            // $FlowFixMe: Still have no idea why it happen 
            Object.entries(apiUrl.endpoints).forEach(([key, url]) => {
                result[
                    // $FlowFixMe: Still have no idea why it happen 
                    parseInt(index) === 0 ? key : this.camelCase(apiUrl.controller) + this.cap(key)
                // $FlowFixMe: Still have no idea why it happen 
                ] = API_BASE_URL + this.snakeCase(apiUrl.controller).replace(/_/g, '-') + '/' + url + (url?'/':'');
    		});
        });
	    return result;
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

	static paramsProcessing(data: Object = {}, fileList: ?{[string]: FileList} = null): Object{
		try{
            if (fileList) {
                let formData = new FormData();
                Object.entries(fileList).forEach(([key, value]) => {
                    // $FlowFixMe: Still have no idea why it happen 
                    formData.set(key, value);
                });
                return {
                    data: formData,
                    contentType: null
                }
            } else {
                return {
					data: JSON.stringify(data),
					contentType: "application/json"
				}
            }	
		}catch(error){
			console.error(error);
			return {};
		}
	}

	static urlDataEncode(obj: Object): string {
		let str = [];
		for(let p in obj){
            // if (has(obj, p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            // }
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
		arr.forEach((value, key) => {
			let arrValue = value.split('=');
			if(arrValue.length === 2){
				result[arrValue[0]] = arrValue[1];
			}
		});
		return result;
	}

	static errorMessageProcessing(input: string | Object): string {
		if(typeof input === 'string'){
			// If message is STRING
			return String(input);
		}else if(Array.isArray(input)){
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

    static popMessage(description: string | Object, title: string='', type: string='success'): void {
        return;
        /*
		const messages = this.errorMessageProcessing(description);
		console.log(messages);
		if(!messages) return;

		if(type === 'success'){
			this.successToast(messages, title?title:'Success!');
		}else{
			this.errorToast(messages, title?title:'Error!');
        }
        */
	}

	static async apiCall(
		url: string,
		method: string,
		params: Object = {},
		popMessage: bool = true,
        usingLoading: bool = true
    ): Promise<{status: number, success: boolean, data: Object}> {
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
			if(Array.isArray(data)){
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
