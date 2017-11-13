import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';


@connect(state => ({}), dispatch => ({}))
class Login extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>Login page</div>
		);
	}
}
export default withRouter(Login);
