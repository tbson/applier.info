import React, { Component } from 'react';
import { connect } from 'react-redux';
import { put } from 'redux-saga/effects'
import { withRouter } from 'react-router-dom';
import { Form, Layout, Icon, Input, Button, Checkbox } from 'antd';
import { actions } from '../_data';
import store from 'app/store';

const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

@connect(state => ({
    reset: state.authReducer.resetForm.FormLogin
}), dispatch => ({}))
class FormLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.reset && this.props.reset !== nextProps.reset){
            this.props.form.resetFields();
        }
    }

    onSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                store.dispatch({type: actions.LOGIN, payload: {...values}});
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.onSubmit} className="login-form">
                <FormItem>
                    {
                        getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )
                    }
                </FormItem>

                <FormItem>
                    {
                        getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                        )
                    }
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" style={styles.loginFormButton}>
                        {this.props.submitTitle}
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const styles = {
    loginFormButton: {
        width: '100%'
    }
}

export default Form.create()(FormLogin);
