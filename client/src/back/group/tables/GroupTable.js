// @flow
import * as React from 'react';
// $FlowFixMe: do not complain about importing node_modules
import {withRouter} from 'react-router-dom';
import CustomModal from 'src/utils/components/CustomModal';
import {apiUrls} from '../_data';
import GroupForm from '../forms/GroupForm';
import GroupModal from '../forms/GroupModal';
import LoadingLabel from 'src/utils/components/LoadingLabel';
import {Pagination, SearchInput} from 'src/utils/components/TableUtils';
import Tools from 'src/utils/helpers/Tools';

type Props = {};
type States = {
    dataLoaded: boolean,
    mainModal: boolean,
    mainList: Array<Object>,
    permissionList: Object,
    mainFormData: Object,
    mainFormErr: Object,
};

export class GroupTable extends React.Component<Props, States> {
    list: Function;
    setInitData: Function;
    toggleModal: Function;
    handleSubmit: Function;
    handleAdd: Function;
    handleEdit: Function;
    handleToggleCheckAll: Function;
    handleCheck: Function;
    handleRemove: Function;
    handleSearch: Function;
    initPermission: Function;

    filterTimeout: ?TimeoutID = null;
    nextUrl: ?string;
    prevUrl: ?string;

    state = {
        dataLoaded: false,
        mainModal: false,
        mainList: [],
        permissionList: {},
        mainFormData: {},
        mainFormErr: {},
    };

    constructor(props: Props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.list = this.list.bind(this);
        this.setInitData = this.setInitData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleToggleCheckAll = this.handleToggleCheckAll.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.initPermission = this.initPermission.bind(this);
    }

    componentDidMount() {
        this.list();
        this.permissionList();
    }

    setInitData(initData: Object) {
        this.nextUrl = initData.links.next;
        this.prevUrl = initData.links.previous;
        const newData = initData.items.map(item => {
            item.checked = !!item.checked;
            return item;
        });
        this.setState({
            dataLoaded: true,
            mainList: [...newData],
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

    async permissionList() {
        const result = await Tools.apiCall(apiUrls.permissionCrud, 'GET');
        if (result.success) {
            let listItem = {};
            for (let item of result.data.items) {
                if (typeof listItem[item.content_type] == 'undefined') {
                    listItem[item.content_type] = [item];
                } else {
                    listItem[item.content_type].push(item);
                }
            }
            this.setState({permissionList: listItem})
            return result;
        }
        return result;
    }

    initPermission (permissionList: Array<number>, blankPermissionList: Object): Object {
        for (let contentType in blankPermissionList) {
            let permissionGroup = blankPermissionList[contentType];
            for (let permission of permissionGroup) {
                if (permissionList.indexOf(permission.id) != -1) {
                    permission.checked = true;
                } else {
                    permission.checked = false;
                }
            }
        }
        return blankPermissionList;
    }

    toggleModal(modalName: string, id: ?number = null): Object {
        // If modalName not defined -> exit here
        if (typeof this.state[modalName] == 'undefined') return {};

        const state = {
            [modalName]: !this.state[modalName],
            mainFormData: {},
            mainFormErr: {},
        };

        if (id) {
            switch (modalName) {
                case 'mainModal':
                    Tools.apiCall(apiUrls.crud + id.toString(), 'GET').then(result => {
                        if (result.success) {
                            state.mainFormData = result.data;
                            this.setState({
                                permissionList: this.initPermission(
                                    result.data.permissions.split(',').map(item => parseInt(item)),
                                    this.state.permissionList
                                )
                            });
                        }
                        this.setState(state);
                    });
                    return state;
            }
        } else {
            this.setState(state);
        }
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
            this.setState({mainFormErr: error});
            return false;
        }
    }

    async handleAdd(params: {name: string}) {
        const result = await Tools.apiCall(apiUrls.crud, 'POST', params);
        if (result.success) {
            this.setState({mainList: [{...result.data, checked: false}, ...this.state.mainList]});
            return null;
        }
        return result.data;
    }

    async handleEdit(params: {id: number, name: string, checked: boolean}) {
        const id = String(params.id);
        const result = await Tools.apiCall(apiUrls.crud + id, 'PUT', params);
        if (result.success) {
            const index = this.state.mainList.findIndex(item => item.id === parseInt(id));
            const {checked} = this.state.mainList[index];
            this.state.mainList[index] = {...result.data, checked};
            this.setState({mainList: this.state.mainList});
            return null;
        }
        return result.data;
    }

    handleToggleCheckAll() {
        var newList = [];
        const checkedItem = this.state.mainList.filter(item => item.checked);
        const result = (checked: boolean) => {
            const mainList = this.state.mainList.map(value => {
                return {...value, checked};
            });
            this.setState({mainList});
        }

        if (checkedItem) {
            if (checkedItem.length === this.state.mainList.length) {
                // Checked all -> uncheck all
                return result(false);
            }
            // Some item checked -> checke all
            return result(true);
        } else {
            // Nothing checked -> check all
            return result(true);
        }
    }


    handleCheck(data: Object, event: Object) {
        data.checked = event.target.checked;
        const index = this.state.mainList.findIndex(item => item.id === parseInt(data.id));
        this.state.mainList[index] = {...data};
        this.setState({mainList: this.state.mainList});
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
        const result = await Tools.apiCall(
            apiUrls.crud + (listId.length === 1 ? id : '?ids=' + id), 
            'DELETE'
        );
        if (result.success) {
            const listId = id.split(',').map(item => parseInt(item));
            const mainList = this.state.mainList.filter(item => listId.indexOf(item.id) === -1);
            this.setState({mainList});
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
        const list = this.state.mainList;
        return (
            <div>
                <SearchInput onSearch={this.handleSearch} />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th className="row25">
                                <span
                                    className="oi oi-check text-info pointer check-all-button"
                                    onClick={() => this.handleToggleCheckAll()}
                                />
                            </th>
                            <th scope="col">Name</th>
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
                                onCheck={this.handleCheck}
                            />
                        ))}
                    </tbody>

                    <tfoot className="thead-light">
                        <tr>
                            <th className="row25">
                                <span
                                    className="oi oi-x text-danger pointer bulk-remove-button"
                                    onClick={() => this.handleRemove(Tools.getCheckedId(this.state.mainList))}
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
                <GroupModal
                    open={this.state.mainModal}
                    defaultValues={this.state.mainFormData}
                    permissionList={this.state.permissionList}
                    errorMessages={this.state.mainFormErr}
                    handleClose={() => this.setState({mainModal: false})}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}
export default withRouter(GroupTable);

type DataType = {
    id: number,
    name: string,
    checked: ?boolean,
};
type RowPropTypes = {
    data: DataType,
    _key: number,
    toggleModal: Function,
    handleRemove: Function,
    onCheck: Function,
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
                        onChange={event => this.props.onCheck(data, event)}
                    />
                </th>
                <td className="name">{data.name}</td>
                <td className="center">
                    <a onClick={() => this.props.toggleModal('mainModal', data.id)}>
                        <span className="editBtn oi oi-pencil text-info pointer"/>
                    </a>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <a onClick={() => this.props.handleRemove(String(data.id))}>
                        <span
                            className="removeBtn oi oi-x text-danger pointer" 
                        />
                    </a>
                </td>
            </tr>
        );
    }
}
