// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from './_data';
import CustomModal from 'utils/components/CustomModal';
// import FormLogin from './forms/FormLogin';
import { apiUrls } from './_data';
import Tools from 'helpers/Tools';
import store from 'app/store';
import LoginForm from './forms/LoginForm'

type Props = {
    loginFail: boolean
};

type States = Object;

class Login extends React.Component<Props, States> {
    handleSubmit: Function;
    handleSubmitResetPassword: Function;
    toggleModal: Function;
    renderModal: Function;
    renderErrorMessage: Function;

    static defaultProps = {
        loginFail: false
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitResetPassword = this.handleSubmitResetPassword.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.renderErrorMessage = this.renderErrorMessage.bind(this);
    }

    async handleSubmit (event) {
        event.preventDefault();
        const data = Tools.formDataToObj(event.target);
        const result = await Tools.apiCall(apiUrls.tokenAuth, 'POST', data);
        if (result.success) {
            Tools.setStorage('authData', result.data.user);
            Tools.navigateTo();
        } else {
            this.setState({
                loginFail: true
            });
        }
        console.log(result);
    }

    async handleSubmitResetPassword (event) {
        event.preventDefault();
        const data = Tools.formDataToObj(event.target);
        const result = await Tools.apiCall(apiUrls.resetPassword, 'POST', data);
        console.log(result);
    }

    toggleModal () {
        this.setState({
            modal: !this.state.modal
        });
    }

    renderErrorMessage () {
        if (!this.state.loginFail) return null;
        return (
            <div 
                className="alert alert-danger" 
                role="alert"
                style={{marginTop: 16}}>
                Wrong username or password!
            </div>
        )
    }

    renderModal () {
        const authData = Tools.getStorageObj('authData');
        return (
            <CustomModal
                open={this.state.modal}
                close={this.toggleModal}
                title="Reset password"
                size="md">
                <div>
                    <LoginForm
                        formId="resetPasswordForm"
                        submitTitle="Reset password"
                        handleSubmit={this.handleSubmitResetPassword}>
                        <button
                            type="button"
                            onClick={this.toggleModal}
                            className="btn btn-warning">
                            <span className="oi oi-x"></span>&nbsp;
                            Cancel
                        </button>
                    </LoginForm>
                </div>
            </CustomModal>
        );
    }

    componentDidMount () {
        const authData = Tools.getStorageObj('authData');
        if (authData.email) {
            Tools.navigateTo();
        }
    } 

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">

                        <div className="jumbotron">
                            <LoginForm 
                                formId="loginForm"
                                submitTitle="Login"
                                handleSubmit={this.handleSubmit}>
                                <span 
                                    className="pointer link"
                                    onClick={this.toggleModal}>
                                    Reset password
                                </span>
                                &nbsp;&nbsp;
                            </LoginForm>
                            {this.renderErrorMessage()} 
                        </div>

                    </div>
                </div>
                {this.renderModal()}
            </div> 
        );
    }
}

export default withRouter(connect(state => ({
}), dispatch => ({}))(Login))
