// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'open-iconic/font/css/open-iconic-bootstrap.min.css'

import 'src/utils/styles/main.css';
import Spinner from 'src/utils/components/Spinner';
import Tools from 'src/utils/helpers/Tools';
import NavWrapper from 'src/utils/components/NavWrapper';
import PrivateRoute from 'src/utils/components/PrivateRoute';
import Login from 'src/components/auth/Login';
import Profile from 'src/components/auth/Profile';
import ResetPassword from 'src/components/auth/ResetPassword';
import Config from 'src/components/config/Config';


type Props = {
};

class App extends React.Component<Props> {
    render() {
        return (
            <div>
                <Spinner/>
                <Switch>
                    <Route exact path="/" component={Profile}/>
                    <Route path="/home" component={Home}/>
                    <Route path="/about/:id" component={About}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/reset-password/:token" component={ResetPassword}/>
                    <Route path="/config" component={Config}/>
                    {/*<PrivateRoute path="/hello" component={Home}/>*/}
                </Switch>
            </div>
        );
    }
}

const Home = ({history}) => (
	<NavWrapper>
        <div>
		    <h2>Home</h2>
            <button
                onClick = {() => {Tools.navigateTo('/about', ['test'])}}
                class="pure-button pure-button-primary">
                Click me
            </button>
		</div>
	</NavWrapper>
)

const About = ({history, match}) => (
	<div>
		<h2>About: {match.params.id}</h2>
	</div>
)

export default withRouter(connect(state => ({
}), dispatch => ({}))(App));