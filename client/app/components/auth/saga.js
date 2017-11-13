import { all, call, take, put, select } from 'redux-saga/effects';
import filter from 'lodash/filter';
import {apiUrls, actions} from './_data';
import store from 'app/store';
import Tools from 'helpers/Tools';
// import ConfigService from './service';

/* >>> BEGIN LOGIN SAGA >>> */
function* login(){
	while(true){
		const {payload: {username, password}}  = yield take(actions.LOGIN);
		yield call(_login, username, password);
	}
}

function* _login(username, password){
	const formId = 'LoginForm';
	const params = {
		username,
		password
	};
	try{
		const result = yield call(Tools.apiCall.bind(Tools), apiUrls.tokenAuth, 'POST', params);
		if(result.success){
			Tools.setStorage('authData', result.data.user);
			Tools.navigateTo();
		}else{
			yield put(stopSubmit(formId, result.data));
		}
	}catch(error){
		console.error(error);
	}
}

/* <<< END LOGIN SAGA <<< */

export default function* authSaga() {
	yield all([
		login()
	]);
}