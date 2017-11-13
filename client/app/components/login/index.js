import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';

import MainForm from './forms';
const { Header, Sider, Content } = Layout;

@connect(state => ({}), dispatch => ({}))
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSubmit(err, values) {
        if (!err) {
            console.log('Received values of form: ', values);
        }
    }

    render() {
        return (
            <Row>
                <Col span={8} offset={8} style={styles.layoutWrapper}>
                    <Card title="Login" bordered={true} style={{ width: '100%' }}>
                        <MainForm onSubmit={this.onSubmit}/>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const styles = {
}

export default withRouter(Login);
