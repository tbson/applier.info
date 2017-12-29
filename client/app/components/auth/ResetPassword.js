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

type Props = {
    match: Object
};

type States = {
    message: string
};

class ResetPassword extends React.Component<Props, States> {
    logout: Function; 

    constructor(props) {
        super(props);
        this.state = {
            message: "Resetting password..."
        };
        this.logout = this.logout.bind(this);
    }

    logout () {
        Tools.removeStorage('authData');
        Tools.navigateTo('/login');
    }

    async componentDidMount () {
        const result = await Tools.apiCall(apiUrls.resetPassword, 'GET', this.props.match.params);
        console.log(result);
        if (result.success) {
            this.logout();
        } else {
            const message = [
                "Wrong token or token expired",
                "Login page comming in 4 seconds.",
            ].join(". ");
            this.setState({
                message
            });
            setTimeout(() => {
                Tools.navigateTo('/login');
            }, 4000)
        }
    } 

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {this.state.message}
                    </div>
                </div>
            </div> 
        );
    }
}

export default withRouter(connect(state => ({
}), dispatch => ({}))(ResetPassword))
