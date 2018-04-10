// @flow
import * as React from 'react';
// $FlowFixMe: do not complain about importing node_modules
import {withRouter} from 'react-router-dom';
import {actions, apiUrls} from './_data';
import NavWrapper from 'src/utils/components/NavWrapper';
import ArticleForm from './forms/ArticleForm';
import Tools from 'src/utils/helpers/Tools';

type Props = {
    match: Object,
};
type States = {
    mainFormData: Object,
    mainFormErr: Object,
};

class ArticleEdit extends React.Component<Props, States> {
    handleSubmit: Function;
    handleAdd: Function;
    handleEdit: Function;

    uuid: string;

    state = {
        mainFormData: {},
        mainFormErr: {},
    };

    constructor(props: Props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    async handleSubmit(event: Object): Promise<boolean> {
        event.preventDefault();
        let error: ?Object = null;
        const params = Tools.formDataToObj(new FormData(event.target));
        params.category = this.props.match.params.category_id;
        if (!params.id) {
            error = await this.handleAdd(params);
        } else {
            error = await this.handleEdit(params);
        }

        if (!error) {
            // No error -> close current modal
            // this.toggleModal('mainModal');
            return true;
        } else {
            // Have error -> update err object
            this.setState({mainFormErr: error});
            return false;
        }
    }

    async handleAdd(params: {category: number, title: string, description: ?string, image: Object}) {
        const result = await Tools.apiCall(apiUrls.crud, 'POST', params);
        if (result.success) {
            // Go back
            return null;
        }
        return result.data;
    }

    async handleEdit(params: {
        id: number,
        category: number,
        title: string,
        description: ?string,
        image: Object,
        checked: boolean,
    }) {
        const id = String(params.id);
        const result = await Tools.apiCall(apiUrls.crud + id, 'PUT', params);
        if (result.success) {
            // Go back
            return null;
        }
        return result.data;
    }

    render() {
        this.uuid = Tools.uuid4();
        return (
            <NavWrapper>
                <ArticleForm
                    uuid={this.uuid}
                    formId="articleForm"
                    submitTitle="Update"
                    defaultValues={this.state.mainFormData}
                    errorMessages={this.state.mainFormErr}
                    handleSubmit={this.handleSubmit}>
                    <button type="button" onClick={()=>{}} className="btn btn-warning">
                        <span className="oi oi-x" />&nbsp; Cancel
                    </button>
                </ArticleForm>
            </NavWrapper>
        );
    }
}

const styles = {};

export default withRouter(ArticleEdit);
