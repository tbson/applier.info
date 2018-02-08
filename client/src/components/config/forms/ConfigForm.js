// @flow
import * as React from 'react';
// $FlowFixMe: do not complain about importing node_modules
import {connect} from 'react-redux';
// $FlowFixMe: do not complain about importing node_modules
import {withRouter} from 'react-router-dom';
import {actions} from '../_data';
import store from 'src/store';

type Props = {
    handleSubmit: Function,
    children?: React.Node,
    formId: string,
    submitTitle: string,
    defaultValue: Object,
    errorMessage: Object,
};
type States = {};

class ConfigForm extends React.Component<Props, States> {
    resetForm: Function;
    setClassName: Function;
    setErrorMessage: Function;

    static defaultProps = {
        submitTitle: 'Submit',
        defaultValue: {
            username: null,
            email: null,
            first_name: null,
            last_name: null,
        },
        errorMessage: {},
    };

    constructor(props) {
        super(props);
        this.state = {};
        this.resetForm = this.resetForm.bind(this);
        this.setClassName = this.setClassName.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
    }

    resetForm() {
        window.document.getElementById(this.props.formId).reset();
        window.document.querySelector('#' + this.props.formId + ' [name=username]').focus();
    }

    setClassName(name) {
        return this.props.errorMessage[name] ? 'form-control is-invalid' : 'form-control';
    }

    setErrorMessage(name) {
        return this.props.errorMessage[name];
    }

    render() {
        return (
            <form id={this.props.formId} onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="uid">Key</label>
                    <input
                        defaultValue={this.props.defaultValue.uid}
                        id="uid"
                        name="uid"
                        type="text"
                        className={this.setClassName('uid')}
                        required
                        autoFocus
                        placeholder="Key..."
                    />
                    <div className="invalid-feedback">{this.setErrorMessage('uid')}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="value">Value</label>
                    <input
                        defaultValue={this.props.defaultValue.value}
                        id="value"
                        name="value"
                        type="text"
                        className={this.setClassName('value')}
                        required
                        placeholder="Value..."
                    />
                    <div className="invalid-feedback">{this.setErrorMessage('value')}</div>
                </div>

                <div className="right">
                    {this.props.children}
                    <button className="btn btn-primary">
                        <span className="oi oi-check" />&nbsp;
                        {this.props.submitTitle}
                    </button>
                </div>
            </form>
        );
    }
}

export default connect((state, props) => ({}), dispatch => ({}))(ConfigForm);
