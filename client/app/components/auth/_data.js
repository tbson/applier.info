import Tools from 'helpers/Tools';
import {FIELD_TYPE, APP} from 'app/constants';

const rawApiUrls = [
    {
        controller: APP,
        endpoints: {
            profile: 'profile',
            tokenAuth: 'token-auth',
        }
    }
];

export const actions = {
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    RESET_FORM: 'auth/resetForm'
};

export const apiUrls = Tools.getApiUrls(rawApiUrls);
