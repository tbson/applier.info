import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Layout, Icon, Input, Button, Checkbox } from 'antd';

import MainForm from './forms';
const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

@connect(state => ({}), dispatch => ({}))
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit(err, values) {
        if (!err) {
            console.log('Received values of form: ', values);
        }
    }

    render() {
        return (
            <MainForm onSubmit={this.handleSubmit}/>
        )
    }
}

export default withRouter(Login);
