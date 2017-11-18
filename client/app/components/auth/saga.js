import { all, call, take, put, select } from 'redux-saga/effects';
import filter from 'lodash/filter';
import {apiUrls, actions} from './_data';
import store from 'app/store';
import Tools from 'helpers/Tools';


/* >>> BEGIN LOGIN SAGA >>> */
function* login(){
	while(true){
		const {payload: {username, password}}  = yield take(actions.LOGIN);
		yield call(_login, username, password);
	}
}

function* _login(username, password){
	const formId = 'FormLogin';
	const params = {
		username,
		password
	};
	try{
		const result = yield call(Tools.apiCall.bind(Tools), apiUrls.tokenAuth, 'POST', params);
		if(result.success){
			yield put({type: actions.RESET_FORM, payload: formId})
			Tools.setStorage('authData', result.data.user);
			Tools.navigateTo();
		}
	}catch(error){
		console.error(error);
	}
}
/* <<< END LOGIN SAGA <<< */

/* >>> BEGIN LOGOUT SAGA >>> */
function* logout(){
	while(true){
		yield take(actions.LOGOUT);
		yield call(_logout);
	}
}

function* _logout(username, password){
	try{
		Tools.removeStorage('authData');
		Tools.navigateTo('/login');
	}catch(error){
		console.error(error);
	}
}
/* <<< END LOGOUT SAGA <<< */

/* >>> BEGIN RESET PASSWORD SAGA >>> */
function* resetPassword(){
	while(true){
		const {payload: {username, password}}  = yield take(actions.RESET_PASSWORD);
		yield call(_resetPassword, username, password);
	}
}

function* _resetPassword(username, password){
	const params = {
		username,
		password
	};
	try{
		const result = yield call(Tools.apiCall.bind(Tools), apiUrls.resetPassword, 'POST', params);
		console.log(result);
		if(result.success){
			/*
			yield put({type: actions.RESET_FORM, payload: formId})
			Tools.setStorage('authData', result.data.user);
			Tools.navigateTo();
			*/
		}
	}catch(error){
		console.error(error);
	}
}
/* <<< END RESET PASSWORD SAGA <<< */

export default function* authSaga() {
	yield all([
		login(),
		logout(),
		resetPassword(),
	]);
}