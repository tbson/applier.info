import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';
import { actions } from './_data';
import FormLogin from './forms/FormLogin';
import store from 'app/store';
const { Header, Sider, Content } = Layout;

@connect(state => ({}), dispatch => ({}))
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row>
                <Col
                    md={{span: 8, offset: 8}}
                    sm={{span: 16, offset: 4}}
                    style={styles.layoutWrapper}>
                    <Card title="Login" bordered={true} style={{ width: '100%' }}>
                        <FormLogin/>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const styles = {
}

export default withRouter(Login);
