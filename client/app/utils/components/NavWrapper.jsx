import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import store from 'app/store';
import 'utils/styles/main.css';
import logo from 'utils/images/logo.png';
import Tools from 'helpers/Tools';
const { Header, Sider, Content } = Layout;


@connect(state => ({}), dispatch => ({}))
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navLink: props.location.pathname
		}
	}

	componentDidMount(){
		// this.props.history.listen((location, action) => {
		this.setState({navLink: this.props.location.pathname});
		// });
	}

	render() {
		return (
			<Layout style={styles.layout}>
				<Sider
					style={styles.sider}
					breakpoint="md"
					collapsedWidth="0">
					<div style={styles.logo}>
						<img src={logo}/>
					</div>
					<Menu
						theme="light"
						mode="inline"
						selectable={false}
						selectedKeys={[this.state.navLink]}>
						<Menu.Item key="/">
							<Link to="/">
								<Icon type="user" />
								<span>
									Home
								</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="/hello">
							<Link to="/hello">
								<Icon type="video-camera" />
								<span>
									Hello
								</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="/about/test">
							<Link to="/about/test">
								<Icon type="video-camera" />
								<span>
									About
								</span>
							</Link>
						</Menu.Item>
					</Menu>
				</Sider>

				<Layout>
					<Header style={styles.header}>
						<Row>
							<Col span={18}>
								<div id="main-title">
									Some title
								</div>
							</Col>
							<Col span={6}>
								<div style={{textAlign: 'right', paddingRight: 12, lineHeight: 3.5}}>
									<span>
										{Tools.getStorage('authData')?Tools.getStorageObj('authData').fullname:''}
									</span>
									&nbsp;&nbsp;
									<Icon
										className="pointer"
										onClick={()=>store.dispatch({type: 'auth/logout'})}
										type="logout"
										style={{fontWeight: 'bold'}}/>
								</div>
							</Col>
						</Row>
					</Header>
					<Content style={styles.content}>
						{ this.props.children }
					</Content>
				</Layout>
			</Layout>
		);
	}
}


const styles = {
	layout: {
		background: '#fff'
	},
	sider: {
		height: '100%',
		background: '#fff'
	},
	logo: {
		height: 42,
		padding: 0,
		borderBottom: '1px solid #E4E4E4'
	},
	header: {
		background: '#fff',
		color: '#000',
		borderBottom: '1px solid #E4E4E4',
		padding: 0,
		height: 42
	},
	content: {
		padding: 12,
		background: '#fff',
		minHeight: "calc(100vh - 42px)"
	}
}

export default withRouter(App);
