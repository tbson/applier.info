import { createBrowserHistory } from 'history';
import { URL_PREFIX_STRIP } from 'app/constants';
export default createBrowserHistory({ basename: URL_PREFIX_STRIP });
