import {all, select, take } from 'redux-saga/effects';
// import authSaga from 'src/js/components/login/saga';


function* watchAndLog() {
	while (true) {
		let action = yield take('*');
		action.state = yield select();
		console.log('%c action', 'color: #103FFB; font-weight: bold', action);
	}
}

export default function* rootSaga() {
	yield all([
		watchAndLog(),
		// authSaga(),
	]);
}