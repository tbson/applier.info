import Tools from 'helpers/Tools';
import {FIELD_TYPE, APP} from 'app/constants';

const rawApiUrls = [
    {
        controller: APP,
        endpoints: {
            profile: 'profile',
            tokenAuth: 'token-auth'
            /*
            obj: 'GET',
            tokenAuth: 'POST',
            logout: 'POST',
            profile: 'GET',
            updateProfile: 'POST',
            resetPassword: 'POST',
            resetPasswordConfirm: 'GET',
            changePassword: 'POST',
            changePasswordConfirm: 'GET'
            */
        }
    }
];

export const actions = {
    LOGIN: 'auth/login',
    RESET_FORM: 'auth/resetForm'
};

export const apiUrls = Tools.getApiUrls(rawApiUrls);
