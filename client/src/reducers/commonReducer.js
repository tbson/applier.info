// @flow
type CommonStateType = {
    spinning: boolean
};

export const commonStateDefault: CommonStateType = {
    spinning: false
}

export default function commonState(
  state: CommonStateType = commonStateDefault,
  action: {type: string, payload: any}): CommonStateType{
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
