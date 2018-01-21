import Tools from 'src/utils/helpers/Tools';
import {FIELD_TYPE, APP} from 'src/constants';

const rawApiUrls = [
    {
        controller: APP,
        endpoints: {
            profile: 'profile',
            tokenAuth: 'token-auth',
            resetPassword: 'reset-password',
            changePassword: 'change-password',
        }
    }
];

export const actions = {
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    RESET_FORM: 'auth/resetForm',
    TOGGLE_RESET_PASSWORD_MODAL: 'auth/toggleResetPasswordModal',
    RESET_PASSWORD: 'auth/resetPassword',
    CHANGE_PASSWORD: 'auth/changePassword',
};

export const apiUrls = Tools.getApiUrls(rawApiUrls);
