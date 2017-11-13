export default function commonReducer(state = {}, action){
	// Noting to mutate
	switch(action.type){
		case 'TOGGLE_SPINNER':
			return {
				...state, spinning: action.spinning
			};
		default:
			return state;
	}
}
