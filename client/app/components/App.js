// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'open-iconic/font/css/open-iconic-bootstrap.min.css'

import 'utils/styles/main.css';
import Spinner from 'utils/components/Spinner';
import Tools from 'helpers/Tools';
import NavWrapper from 'utils/components/NavWrapper';
import PrivateRoute from 'utils/components/PrivateRoute';
import Login from 'components/auth/Login';
import Profile from 'components/auth/Profile';


type Props = {
	spinning: boolean
};

class App extends React.Component<Props> {
  render() {
		return (
      <Switch>
        <Route exact path="/" component={Profile}/>
        <Route path="/home" component={Home}/>
        <Route path="/about/:id" component={About}/>
        <Route path="/login" component={Login}/>
        {/*<PrivateRoute path="/hello" component={Home}/>*/}
      </Switch>
		);
  }
  /*
	render() {
    return (
      <NavWrapper>
        <Spinner/>
        <div>Content</div>
      </NavWrapper>
		);
  }
  */
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
	spinning: state.commonReducer.spinning
}), dispatch => ({}))(App));
