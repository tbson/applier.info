// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomModal from 'utils/components/CustomModal';
import { actions } from './_data';
import store from 'app/store';
import Tools from 'helpers/Tools';
import NavWrapper from 'utils/components/NavWrapper';
import UpdateProfileForm from './forms/UpdateProfileForm';


type Props = Object;
type States = Object;


class Profile extends React.Component<Props, States> {
    toggleModal: Function;
    renderModal: Function;
    handleSubmit: Function;

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.renderModal = this.renderModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit (event) {
        event.preventDefault();
        const data = Tools.formDataToObj(event.target);
        this.toggleModal();
        console.log(data);
    }

    toggleModal () {
        this.setState({
            modal: !this.state.modal
        });
    }

    renderModal () {
        const authData = Tools.getStorageObj('authData');
        return (
            <CustomModal
                open={this.state.modal}
                close={this.toggleModal}
                title="Update profile"
                size="md">
                <div>
                    <UpdateProfileForm
                        formId="updateProfileForm"
                        defaultValue={authData}
                        submitTitle="Update profile"
                        handleSubmit={this.handleSubmit}>
                        <button
                            type="button"
                            onClick={this.toggleModal}
                            className="btn btn-warning">
                            <span className="oi oi-x"></span>&nbsp;
                            Cancel
                        </button>
                    </UpdateProfileForm>
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
                        onClick={() => this.toggleModal()}
                        className="btn btn-success">
                        Update profile
                    </button>
                    <button
                        className="btn btn-primary">
                        Change password
                    </button>
                </div>
                {this.renderModal()}
            </NavWrapper>
        )
    }
}

const styles = {
}

export default withRouter(connect(state => ({
}), dispatch => ({}))(Profile));
