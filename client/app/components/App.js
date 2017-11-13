import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import { Button } from 'antd';
import NavWrapper from 'utils/components/NavWrapper';
import Tools from 'helpers/Tools';
import 'utils/styles/main.css';


@connect(state => ({}), dispatch => ({}))
class App extends Component {
	render() {
		return (
			<div>
				<Route exact path="/" component={Home}/>
				<Route path="/about/:id" component={About}/>
				<Route path="/hello/" component={Home}/>
			</div>
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
