// @flow
import * as React from 'react';

type Props = {
    handleSubmit: Function,
    children?: React.Node,
    formId: string,
    submitTitle: string,
    defaultValues: {
        id: ?number,
        title: ?string,
        description: ?string,
        image: ?string,
    },
    errorMessages: Object,
};
type States = {};

export default class BannerForm extends React.Component<Props, States> {
    resetForm: Function;
    setClassName: Function;
    setErrorMessage: Function;

    static defaultProps = {
        submitTitle: 'Submit',
        defaultValues: {
            id: null,
            title: null,
            description: null,
            image: null,
        },
        errorMessages: {},
    };

    state = {};
    constructor(props: Props) {
        super(props);
        this.resetForm = this.resetForm.bind(this);
        this.setClassName = this.setClassName.bind(this);
        this.setErrorMessage = this.setErrorMessage.bind(this);
    }

    resetForm() {
        window.document.getElementById(this.props.formId).reset();
        window.document.querySelector('#' + this.props.formId + ' [name=title]').focus();
    }

    setClassName(name: string) {
        return this.props.errorMessages[name] ? 'form-control is-invalid' : 'form-control';
    }

    setErrorMessage(name: string) {
        return this.props.errorMessages[name];
    }

    render() {
        return (
            <form id={this.props.formId} onSubmit={this.props.handleSubmit}>
                <input defaultValue={this.props.defaultValues.id} name="id" type="hidden" />
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        defaultValue={this.props.defaultValues.title}
                        id="title"
                        name="title"
                        type="text"
                        className={this.setClassName('title')}
                        required
                        autoFocus
                        placeholder="Title..."
                    />
                    <div className="invalid-feedback">{this.setErrorMessage('uid')}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        defaultValue={this.props.defaultValues.description}
                        id="description"
                        name="description"
                        type="text"
                        className={this.setClassName('description')}
                        placeholder="Description..."
                    ></textarea>
                    <div className="invalid-feedback">{this.setErrorMessage('uid')}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        defaultValue={this.props.defaultValues.image}
                        id="image"
                        name="image"
                        type="file"
                        className={this.setClassName('image')}
                        required
                        placeholder="Image..."
                    />
                    <div className="invalid-feedback">{this.setErrorMessage('uid')}</div>
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
