import Tools from 'helpers/Tools';
import { apiUrls } from './_data';

export default class AuthService {
	static async onLogin(username, password){
		const formId = 'LoginForm';
		const params = {
			username,
			password
		};
		try{
			const result = await Tools.apiCall(apiUrls.tokenAuth, 'POST', params);
			if(result.success){
				Tools.setStorage('authData', result.data.user);
				Tools.navigateTo();
			}
		}catch(error){
			console.error(error);
		}
	}
}