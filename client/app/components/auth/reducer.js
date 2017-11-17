import Tools from 'helpers/Tools';
import { actions } from './_data';

export default function authReducer(state = {}, action){
	const prefix = 'auth' + '/';
	const {data, pages, index, dataLoaded, modalId, open} = (action.payload ? action.payload : {});
	switch(action.type){
		case actions.RESET_FORM:
			let data = {};
			data[action.payload] = state.resetForm[action.payload] + 1;
			return {
				...state,
				resetForm: {...state.resetForm, ...data}
			};
		case actions.TOGGLE_MAIN_MODAL:
			return {
				...state,
				mainModalVisible: action.payload
			};
		case prefix + 'toggleModal':
			if(!modalId) return state;
			let newState = {};
			newState[modalId] = (typeof open === 'undefined' || open)?true:false;
			return {
				...state,
				...newState
			};
		case prefix + 'updateProfile':
			return {
				...state,
				profile: {...state.profile, ...action.payload}
			};
		default:
			return state;
	}
}
