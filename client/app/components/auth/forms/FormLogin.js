// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { put } from 'redux-saga/effects'
import { withRouter } from 'react-router-dom';
import { Form, Layout, Icon, Input, Button, Checkbox } from 'antd';
import { actions } from '../_data';
import store from 'app/store';

const { Header, Sider, Content } = Layout;
const FormItem = Form.Item;

type Props = {
    submitTitle: string,
    reducer: string,
    onSubmit: Function,
    form: any
};
type States = Object;


class FormLogin extends React.Component<Props, States> {
    onSubmit: Function;

    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps: Object): void{
        if(nextProps.reset && this.props.reset !== nextProps.reset){
            this.props.form.resetFields();
        }
    }

    onSubmit(e: SyntheticEvent<>): void {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                this.props.onSubmit(values);
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

const FormLoginConnected = connect((state, props) => ({
    reset: state[props.reducer].resetForm.FormLogin
}), dispatch => ({}))(FormLogin);

FormLoginConnected.defaultProps = {
    reducer: 'authReducer'
};

const styles = {
    loginFormButton: {
        width: '100%'
    }
}

export default Form.create()(FormLoginConnected);
