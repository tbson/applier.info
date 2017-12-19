// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomModal from 'utils/components/CustomModal';
import { actions } from './_data';
import store from 'app/store';
import Tools from 'helpers/Tools';
import NavWrapper from 'utils/components/NavWrapper';


type Props = Object;
type States = Object;

class Profile extends React.Component<Props, States> {
  toggleModal: Function;
  renderModal: Function;

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.renderModal = this.renderModal.bind(this);
  }

  toggleModal () {
    this.setState({
      modal: !this.state.modal
    });
  }

  renderModal () {
    var dialogStyles = {
      height: 'auto',
    };
    return (
      <CustomModal
        open={this.state.modal}
        close={() => this.toggleModal()}
        title="A Stateless Modal"
        size="md">
        <div>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <p>I'm a Stateless modal!</p>
          <div className="right">
            <button
              className="btn btn-primary">
              OK
            </button>
            <button
              onClick={() => this.toggleModal()}
              className="btn btn-warning">
              Cancel
            </button>
          </div>
        </div>
      </CustomModal>
    );
  }

  render() {
    const authData = Tools.getStorageObj('authData');
    return (
      <NavWrapper>
        {this.renderModal()}
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
      </NavWrapper>
    )
  }
}

const styles = {
}

export default withRouter(connect(state => ({
}), dispatch => ({}))(Profile));
