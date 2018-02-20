// @flow
import * as React from 'react';
// $FlowFixMe: do not complain about importing node_modules
import {connect} from 'react-redux';
// $FlowFixMe: do not complain about importing node_modules
import {bindActionCreators} from 'redux';
// $FlowFixMe: do not complain about importing node_modules
import {withRouter} from 'react-router-dom';
import CustomModal from 'src/utils/components/CustomModal';
import {actions, apiUrls} from '../_data';
import ConfigForm from '../forms/ConfigForm';
import configAction from '../actions';
import ConfigModal from '../forms/ConfigModal';
import LoadingLabel from 'src/utils/components/LoadingLabel';
import {Pagination, SearchInput} from 'src/utils/components/TableUtils';
import store from 'src/store';
import Tools from 'src/utils/helpers/Tools';

type Props = {
    configState: Object,
    action: Function,
};
type States = {
    dataLoaded: boolean,
    mainModal: boolean,
};

export class ConfigTable extends React.Component<Props, States> {
    list: Function;
    setInitData: Function;
    toggleModal: Function;
    handleSubmit: Function;
    handleAdd: Function;
    handleEdit: Function;
    handleRemove: Function;
    handleSearch: Function;

    filterTimeout: ?TimeoutID = null;
    nextUrl: ?string;
    prevUrl: ?string;
    constructor(props: Object) {
        super(props);
        this.state = {
            dataLoaded: false,
            mainModal: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.list = this.list.bind(this);
        this.setInitData = this.setInitData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.list();
    }

    setInitData(initData: Object) {
        this.props.action('list', {
            data: [...initData.items],
            pages: initData.pages,
        });
        this.nextUrl = initData.links.next;
        this.prevUrl = initData.links.previous;
        this.setState({
            dataLoaded: true,
        });
    }

    async list(outerParams: Object = {}, url: ?string = null) {
        let params = {};
        let result = {};

        if (!Tools.emptyObj(outerParams)) {
            params = {...params, ...outerParams};
        }

        result = await Tools.apiCall(url ? url : apiUrls.crud, 'GET', params);
        if (result.success) {
            this.setInitData(result.data);
            return result;
        }
        return result;
    }

    toggleModal(modalName: string, id: ?number = null): Object {
        // If modalName not defined -> exit here
        if (typeof this.state[modalName] == 'undefined') return {};

        const state = {id};
        state[modalName] = !this.state[modalName];
        switch (modalName) {
            case 'mainModal':
                if (id) {
                    Tools.apiCall(apiUrls.crud + id.toString(), 'GET').then(result => {
                        if (result.success) {
                            this.props.action('obj', {data: result.data});
                        }
                        this.setState(state);
                    });
                    return state;
                } else {
                    this.props.action('obj', {});
                    this.props.action('err', {});
                }
                break;
        }
        this.setState(state);
        return state;
    }

    async handleSubmit(event: Object): Promise<boolean> {
        event.preventDefault();
        let error: ?Object = null;
        const params = Tools.formDataToObj(new FormData(event.target));
        if (!params.id) {
            error = await this.handleAdd(params);
        } else {
            error = await this.handleEdit(params);
        }

        if (!error) {
            // No error -> close current modal
            this.toggleModal('mainModal');
            return true;
        } else {
            // Have error -> update err object
            this.props.action('err', {data: error});
            return false;
        }
    }

    async handleAdd(params: {uid: string, value: string}) {
        const result = await Tools.apiCall(apiUrls.crud + 'create/', 'POST', params);
        if (result.success) {
            result.data.checked = false;
            this.props.action('add', {data: result.data});
            return null;
        }
        return result.data;
    }

    async handleEdit(params: {id: number, uid: string, value: string, checked: boolean}) {
        const id = String(params.id);
        const result = await Tools.apiCall(apiUrls.crud + id + '/edit/', 'PUT', params);
        if (result.success) {
            this.props.action('edit', {id: parseInt(id), data: result.data});
            return null;
        }
        return result.data;
    }

    async handleRemove(id: string) {
        const listId = id.split(',');
        if (!id || !listId.length) return;
        let message = '';
        if (listId.length === 1) {
            message = 'Do you want to remove this item?';
        } else {
            message = 'Do you want to remove selected items?';
        }
        const decide = confirm(message);
        if (!decide) return;
        const result = await Tools.apiCall(apiUrls.crud + id + '/delete/', 'DELETE');
        if (result.success) {
            this.props.action('remove', {id});
        } else {
            this.list();
        }
    }

    handleSearch(event: Object) {
        event.preventDefault();
        const {searchStr} = Tools.formDataToObj(new FormData(event.target));
        if (searchStr.length > 2) {
            this.list({search: searchStr});
        } else if (!searchStr.length) {
            this.list();
        }
    }

    render() {
        if (!this.state.dataLoaded) return <LoadingLabel />;
        const list = this.props.configState.list;
        return (
            <div>
                <SearchInput onSearch={this.handleSearch} />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th className="row25">
                                <span
                                    className="oi oi-check text-info pointer check-all-button"
                                    onClick={() => this.props.action('toggleCheckAll')}
                                />
                            </th>
                            <th scope="col">Key</th>
                            <th scope="col">Value</th>
                            <th scope="col" style={{padding: 8}} className="row80">
                                <button
                                    className="btn btn-primary btn-sm btn-block add-button"
                                    onClick={() => this.toggleModal('mainModal')}>
                                    <span className="oi oi-plus" />&nbsp; Add
                                </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {list.map((data, key) => (
                            <Row
                                className="table-row"
                                data={data}
                                key={key}
                                _key={key}
                                toggleModal={this.toggleModal}
                                handleRemove={this.handleRemove}
                                action={this.props.action}
                            />
                        ))}
                    </tbody>

                    <tfoot className="thead-light">
                        <tr>
                            <th className="row25">
                                <span
                                    className="oi oi-x text-danger pointer bulk-remove-button"
                                    onClick={() => this.handleRemove(Tools.getCheckedId(this.props.configState.list))}
                                />
                            </th>
                            <th className="row25 right" colSpan="99">
                                <Pagination
                                    next={this.nextUrl}
                                    prev={this.prevUrl}
                                    onNavigate={url => this.list({}, url)}
                                />
                            </th>
                        </tr>
                    </tfoot>
                </table>
                <ConfigModal
                    open={this.state.mainModal}
                    defaultValues={this.props.configState.obj}
                    errorMessages={this.props.configState.err}
                    handleClose={() => this.setState({mainModal: false})}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}
export default withRouter(
    connect(
        state => ({
            configState: state.configState,
        }),
        dispatch => ({
            action: bindActionCreators(configAction, dispatch),
        }),
    )(ConfigTable),
);

type DataType = {
    id: number,
    uid: string,
    value: string,
    checked: ?boolean,
};
type RowPropTypes = {
    data: DataType,
    _key: number,
    toggleModal: Function,
    handleRemove: Function,
    action: Function,
};
export class Row extends React.Component<RowPropTypes> {
    render() {
        const data = this.props.data;
        return (
            <tr key={this.props._key}>
                <th className="row25">
                    <input
                        className="check"
                        type="checkbox"
                        checked={data.checked}
                        onChange={event => {
                            this.props.action('edit', {
                                data: {checked: event.target.checked},
                                id: data.id,
                            });
                        }}
                    />
                </th>
                <td className="uid">{data.uid}</td>
                <td className="value">{data.value}</td>
                <td className="center">
                    <span
                        className="editBtn oi oi-pencil text-info pointer"
                        onClick={() => this.props.toggleModal('mainModal', data.id)}
                    />
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span
                        className="removeBtn oi oi-x text-danger pointer"
                        onClick={() => this.props.handleRemove(String(data.id))}
                    />
                </td>
            </tr>
        );
    }
}
