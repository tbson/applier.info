// @flow
type ResetFormType = {
    FormLogin: number,
};

type LoginType = {
    email: string,
    password: string,
};

type ProfileType = {
    email: string,
    first_name: string,
    last_name: string,
    role_id: string,
};

export type AuthStateType = {
    mainModalVisible: boolean,
    resetForm: ResetFormType,
    login: LoginType,
    profile: ProfileType,
};

export const authStateDefault: AuthStateType = {
    mainModalVisible: false,
    resetForm: {
        FormLogin: 0,
    },
    login: {
        email: '',
        password: '',
    },
    profile: {
        email: '',
        first_name: '',
        last_name: '',
        role_id: '',
    },
};

export default function authState(
    state: AuthStateType = authStateDefault,
    action: {type: string, payload: any},
): AuthStateType {
    const prefix = 'auth' + '/';
    const {data, pages, index, dataLoaded, modalId, open} = action.payload ? action.payload : {};
    switch (action.type) {
        case prefix + 'resetForm':
            let data = {};
            data[action.payload] = state.resetForm[action.payload] + 1;
            return {
                ...state,
                resetForm: {...state.resetForm, ...data},
            };
        case prefix + 'toggleResetPasswordModal':
            return {
                ...state,
                mainModalVisible: action.payload,
            };
        case prefix + 'toggleModal':
            if (!modalId) return state;
            let newState = {};
            newState[modalId] = typeof open === 'undefined' || open ? true : false;
            return {
                ...state,
                ...newState,
            };
        case prefix + 'updateProfile':
            return {
                ...state,
                profile: {...state.profile, ...action.payload},
            };
        default:
            return state;
    }
}
