// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from './_data';
// import FormLogin from './forms/FormLogin';
import store from 'app/store';

type Props = {
    mainModalVisible: boolean
};

type States = Object;

class Login extends React.Component<Props, States> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pure-g">
        <div class="pure-u-1-3"> ... </div>
        <div class="pure-u-1-3"> ... </div>
        <div class="pure-u-1-3"> ... </div>
      </div>
    );
  }
}

type MainModalProps = {
    visible: boolean,
    onSubmit: Function
};

const styles = {
}

export default withRouter(connect(state => ({
    mainModalVisible: state.authReducer.mainModalVisible
}), dispatch => ({}))(Login));
