// @flow
import * as React from 'react';
// $FlowFixMe: do not complain about importing node_modules
import {withRouter, Switch, Route} from 'react-router-dom';
// $FlowFixMe: do not complain about importing node_modules
import 'bootstrap/dist/css/bootstrap.min.css';
// $FlowFixMe: do not complain about importing node_modules
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
// $FlowFixMe: do not complain about importing node_modules
import {ToastContainer} from 'react-toastify';

import 'src/utils/styles/main.css';
import Spinner from 'src/utils/components/Spinner';
import Tools from 'src/utils/helpers/Tools';
import NavWrapper from 'src/utils/components/NavWrapper';
import PrivateRoute from 'src/utils/components/PrivateRoute';
import Login from 'src/components/auth/Login';
import Profile from 'src/components/auth/Profile';
import ResetPassword from 'src/components/auth/ResetPassword';
import Config from 'src/components/config/Config';

type Props = {};

class App extends React.Component<Props> {
    render() {
        return (
            <div>
                <Spinner />
                <ToastContainer autoClose={5000} />
                <Switch>
                    <Route exact path="/" component={Profile} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset-password/:token" component={ResetPassword} />
                    <Route path="/config" component={Config} />
                    {/*<PrivateRoute path="/hello" component={Home}/>*/}
                </Switch>
            </div>
        );
    }
}

export default withRouter(App);
