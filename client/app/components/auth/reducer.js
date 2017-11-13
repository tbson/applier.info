import Tools from 'helpers/Tools';

export default function authReducer(state = {}, action){
	const prefix = 'auth' + '/';
	const {data, pages, index, dataLoaded, modalId, open} = (action.payload ? action.payload : {});
	switch(action.type){
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
