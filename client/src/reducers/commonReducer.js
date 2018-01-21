// @flow
type CommonReducerType = {
    spinning: boolean
};

export const commonReducerDefault: CommonReducerType = {
    spinning: false
}

export default function commonReducer(
  state: CommonReducerType = commonReducerDefault,
  action: {type: string, payload: any}): CommonReducerType{
    switch(action.type){
        case 'TOGGLE_SPINNER':
            return {
                ...state, spinning: action.payload.spinning
            };
        case 'ACTIVE_MODAL':
            return {
                ...state, activeModal: action.payload.activeModal
            };
        default:
            return state;
    }
}
