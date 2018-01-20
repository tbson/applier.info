// @flow
import * as React from 'react';
import { connect } from 'react-redux';


type Props = {
    children?: React.Node,
    handleSubmit: Function,
    formId: string,
    submitTitle: string
};

type States = {};


class LoginForm extends React.Component<Props, States> {
    resetForm: Function;

    static defaultProps = {
        submitTitle: 'Submit'
    }

    constructor(props) {
        super(props);
        this.state = {};
        this.resetForm = this.resetForm.bind(this);
    }

    resetForm () {
        window.document.getElementById(this.props.formId).reset();
        window.document.querySelector('#' + this.props.formId + ' [name=username]').focus();
    }

    render() {
        return (
            <form 
                id={this.props.formId} 
                onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <span className="oi oi-person"></span>
                        </span>
                        <input 
                            id="username" 
                            name="username" 
                            type="text" 
                            className="form-control" 
                            required
                            placeholder="Username..."/>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                        <span className="input-group-addon">
                            <span className="oi oi-lock-locked"></span>
                        </span>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            className="form-control" 
                            required
                            placeholder="Password..."/>
                    </div>
                </div>

                <div className="right">
                    {this.props.children}
                    <button type="submit" className="btn btn-primary">
                        <span className="oi oi-check"></span>&nbsp;
                        {this.props.submitTitle}
                    </button>
                </div>
            </form>
        );
    }
}

export default connect((state, props) => ({
}), dispatch => ({
}))(LoginForm);

