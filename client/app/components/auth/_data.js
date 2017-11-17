import Tools from 'helpers/Tools';
import {FIELD_TYPE, APP} from 'app/constants';

const rawApiUrls = [
    {
        controller: APP,
        endpoints: {
            profile: 'profile',
            tokenAuth: 'token-auth',
            resetPassword: 'reset-password',
        }
    }
];

export const actions = {
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    RESET_FORM: 'auth/resetForm',
    TOGGLE_MAIN_MODAL: 'auth/toggleMainModal',
    RESET_PASSWORD: 'auth/resetPassword',
};

export const apiUrls = Tools.getApiUrls(rawApiUrls);
