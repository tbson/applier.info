import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Tools from 'helpers/Tools';

export default class PrivateRoute extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		if(Tools.getToken()){
			return 	(<Route {...this.props}/>);
		}
		console.log('go herer');
		return (
			<Redirect to={{
				push: true,
				pathname: '/login',
				state: { from: this.props.location }
			}}/>
		)
		/*
		return (
			<Route {...this.props} render={props => (
				Tools.getToken() ? (
					<Component {...props}/>
				) : (
					<Redirect to={{
						pathname: '/login',
						state: { from: props.location }
					}}/>
				)
			)}/>
		);
		*/
	}
}