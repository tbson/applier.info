import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Layout, Icon, Input, Button, Checkbox } from 'antd';

const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        this.props.form.validateFields(this.props.onSubmit);
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
                    {
                        getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )
                    }
                    <a style={styles.loginFormForgot} href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" style={styles.loginFormButton}>
                        Log in
                    </Button>
                    <span>
                        Or <a href="">register now!</a>
                    </span>
                </FormItem>
            </Form>
        );
    }
}

const styles = {
    loginFormForgot: {
        float: 'right'
    },
    loginFormButton: {
        width: '100%'
    }
}

export default Form.create()(LoginForm);
