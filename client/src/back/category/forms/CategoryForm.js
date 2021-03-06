// @flow
import * as React from 'react';
import SelectInput from 'src/utils/components/SelectInput';

type Props = {
    handleSubmit: Function,
    children?: React.Node,
    formId: string,
    submitTitle: string,
    defaultValues: {
        id: ?number,
        title: ?string,
        type: ?string,
        single: boolean,
    },
    errorMessages: Object,
    typeList: Array<Object>,
};
type States = {};

export default class CategoryForm extends React.Component<Props, States> {
    resetForm: Function;
    setClassName: Function;
    setErrorMessage: Function;

    static defaultProps = {
        submitTitle: 'Submit',
        defaultValues: {
            id: null,
            title: null,
            type: null,
            single: false,
        },
        errorMessages: {},
        typeList: [],
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
        window.document.querySelector('#' + this.props.formId + ' [name=uid]').focus();
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
                    <div className="invalid-feedback">{this.setErrorMessage('title')}</div>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <SelectInput
                        defaultValue={this.props.defaultValues.type}
                        name="type"
                        options={this.props.typeList}
                    />
                    <input type="hidden" />
                    <div className="invalid-feedback">{this.setErrorMessage('type')}</div>
                </div>

                <div className="form-check">
                    <input
                        id="single"
                        name="single"
                        type="checkbox"
                        defaultChecked={this.props.defaultValues.single}
                        className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="single">
                        Single
                    </label>
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
