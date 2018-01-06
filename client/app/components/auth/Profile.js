// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomModal from 'utils/components/CustomModal';
import { actions, apiUrls } from './_data';
import store from 'app/store';
import Tools from 'helpers/Tools';
import NavWrapper from 'utils/components/NavWrapper';
import UpdateProfileForm from './forms/UpdateProfileForm';
import ChangePasswordForm from './forms/ChangePasswordForm';


type Props = Object;
type States = {
    profileModal: bool,
    changePasswordModal: bool,
    changePasswordError: string
};


class Profile extends React.Component<Props, States> {
    toggleModal: Function;
    renderErrorMessage: Function;
    renderProfileModal: Function;
    renderChangePasswordModal: Function;
    handleUpdateProfile: Function;
    handleChangePassword: Function;

    constructor(props) {
        super(props);
        this.state = {
            profileModal: false,
            changePasswordModal: false,
            changePasswordError: ''
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.renderProfileModal = this.renderProfileModal.bind(this);
        this.renderChangePasswordModal = this.renderChangePasswordModal.bind(this);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    async handleUpdateProfile (event) {
        event.preventDefault();
        const data = Tools.formDataToObj(event.target);
        this.toggleModal('profileModal');
        console.log(data);
    }

    async handleChangePassword (event) {
        event.preventDefault();
        const data = Tools.formDataToObj(event.target);

        const result = await Tools.apiCall(apiUrls.changePassword, 'POST', data);
        if (result.success) {
            this.toggleModal('changePasswordModal');
        } else {
            this.setState({
                changePasswordError: Tools.errorMessageProcessing(result.data)
            });
        }
    }

    toggleModal (modalId: string) {
        let state = {};
        state[modalId] = !this.state[modalId]
        switch (modalId) {
            case 'changePasswordModal':
                state.changePasswordError = '';
            break;
        }
        this.setState(state);
    }

    renderErrorMessage (message: ?string = '') {
        if (!message) return null;
        return (
            <div 
                className="alert alert-danger" 
                role="alert"
                style={{marginTop: 16}}>
                {message}
            </div>
        )
    }

    renderProfileModal () {
        const authData = Tools.getStorageObj('authData');
        const modalId = 'profileModal';
        return (
            <CustomModal
                open={this.state[modalId]}
                close={() => this.toggleModal(modalId)}
                title="Update profile"
                size="md">
                <div>
                    <UpdateProfileForm
                        formId="updateProfileForm"
                        defaultValue={authData}
                        submitTitle="Update profile"
                        handleSubmit={this.handleUpdateProfile}>
                        <button
                            type="button"
                            onClick={() => this.toggleModal(modalId)}
                            className="btn btn-warning">
                            <span className="oi oi-x"></span>&nbsp;
                            Cancel
                        </button>
                    </UpdateProfileForm>
                </div>
            </CustomModal>
        );
    }

    renderChangePasswordModal () {
        const authData = Tools.getStorageObj('authData');
        const modalId = 'changePasswordModal';
        return (
            <CustomModal
                open={this.state[modalId]}
                close={() => this.toggleModal(modalId)}
                title="Change password"
                size="md">
                <div>
                    <ChangePasswordForm
                        formId="changePasswordForm"
                        submitTitle="Change password"
                        handleSubmit={this.handleChangePassword}>
                        <button
                            type="button"
                            onClick={() => this.toggleModal(modalId)}
                            className="btn btn-warning">
                            <span className="oi oi-x"></span>&nbsp;
                            Cancel
                        </button>
                    </ChangePasswordForm>
                    {this.renderErrorMessage(this.state.changePasswordError)} 
                </div>
            </CustomModal>
        );
    }

    render() {
        const authData = Tools.getStorageObj('authData');
        return (
            <NavWrapper>
                <div>
                    <div>Email: {authData.email}</div>
                    <div>Username: {authData.username}</div>
                    <div>Fullname: {authData.fullname}</div>
                </div>
                <div>
                    <button
                        onClick={() => this.toggleModal('profileModal')}
                        className="btn btn-success">
                        Update profile
                    </button>
                    <button
                        onClick={() => this.toggleModal('changePasswordModal')}
                        className="btn btn-primary">
                        Change password
                    </button>
                </div>
                {this.renderProfileModal()}
                {this.renderChangePasswordModal()}
            </NavWrapper>
        )
    }
}

const styles = {
}

export default withRouter(connect(state => ({
}), dispatch => ({}))(Profile));
