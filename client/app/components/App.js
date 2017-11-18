import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { Button, Spin } from 'antd';
import NavWrapper from 'utils/components/NavWrapper';
import PrivateRoute from 'utils/components/PrivateRoute';
import Tools from 'helpers/Tools';
import Login from 'components/auth/Login';
import 'utils/styles/main.css';


@connect(state => ({spinning: state.commonReducer.spinning}), dispatch => ({}))
class App extends Component {
	render() {
		return (
			<Spin size="large" spinning={this.props.spinning}>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/about/:id" component={About}/>
					<Route path="/login" component={Login}/>
					<PrivateRoute path="/hello" component={Home}/>
				</Switch>
			</Spin>
		);
	}
}

const Home = ({history}) => (
	<NavWrapper>
		<div>
			<h2>Home</h2>
				<Button type="primary" onClick = {() => {Tools.navigateTo('/about', ['test'])}}>Click me</Button>
		</div>
	</NavWrapper>
)

const About = ({history, match}) => (
	<div>
		<h2>About: {match.params.id}</h2>
	</div>
)

export default withRouter(App);
