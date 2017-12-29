// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from '../_data';
import store from 'app/store';


type Props = {
    handleSubmit: Function,
    children?: React.Node,
    formId: string,
    submitTitle: string,
    defaultValue: Object
};
type States = {};


class UpdateProfileForm extends React.Component<Props, States> {
    resetForm: Function;

    static defaultProps = {
        submitTitle: 'Submit',
        defaultValue: {
            username: null,
            email: null,
            first_name: null,
            last_name: null
        }
    };

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
                    <input 
                        defaultValue={this.props.defaultValue.username}
                        id="username" 
                        name="username" 
                        type="text" 
                        className="form-control" 
                        required
                        autoFocus
                        placeholder="Username..."/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input 
                        defaultValue={this.props.defaultValue.email}
                        id="email" 
                        name="email" 
                        type="email" 
                        className="form-control" 
                        required
                        placeholder="Email..."/>
                </div> 

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="username">Firstname</label>
                            <input 
                                defaultValue={this.props.defaultValue.first_name}
                                id="first_name" 
                                name="first_name" 
                                type="text" 
                                className="form-control" 
                                required
                                placeholder="Firstname..."/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="username">Lastname</label>
                            <input 
                                defaultValue={this.props.defaultValue.last_name}
                                id="last_name" 
                                name="last_name" 
                                type="text" 
                                className="form-control" 
                                required
                                placeholder="Lastname..."/>
                        </div>
                    </div>
                </div> 

                <div className="right">
                    {this.props.children}
                    <button className="btn btn-primary">
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
}))(UpdateProfileForm);

