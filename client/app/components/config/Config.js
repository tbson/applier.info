// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomModal from 'utils/components/CustomModal';
import { actions, apiUrls } from './_data';
import store from 'app/store';
import Tools from 'helpers/Tools';
import NavWrapper from 'utils/components/NavWrapper';
import ConfigForm from './forms/ConfigForm';


type Props = Object;
type States = {
    dataLoaded: bool,
    mainModal: bool,
    id: ?number
};


class Config extends React.Component<Props, States> {
    toggleModal: Function;
    list: Function;
    setInitData: Function;
    renderRows: Function;
    renderMainModal: Function;
    handleChange: Function;
    handleAdd: Function;
    handleEdit: Function;
    handleRemove: Function;

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false,
            mainModal: false,
            id: null
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.list = this.list.bind(this);
        this.setInitData = this.setInitData.bind(this);
        this.renderRows = this.renderRows.bind(this);
        this.renderMainModal = this.renderMainModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount () {
        this.list();
    }

    setInitData (initData: Object) {
        store.dispatch({type: 'config/list', payload: {
            data: [...initData.items], 
            pages: initData.pages
        }});
        this.setState({dataLoaded: true});
    }

    async list (outerParams:Object = {}, page:number = 1) {
        let params = {
            page
        };

        if(!Tools.emptyObj(outerParams)){
            params = {...params, ...outerParams};
        }

        const result = await Tools.apiCall(apiUrls.crud, 'GET');
        if(result.success){
            this.setInitData(result.data);
        }
    }

    async handleAdd (data: Object) {
        const result = await Tools.apiCall(apiUrls.crud + 'create/', 'POST', data);
        if (result.success) {
            result.data.checked = false;
            store.dispatch({
                type: 'config/add',
                payload: {
                    data: result.data
                }
            });
            this.toggleModal('mainModal');
        } else {
            store.dispatch({
                type: 'config/err',
                payload: {data: result.data}
            });
        }
    }

    async handleEdit (id: number, data: Object) {
        const result = await Tools.apiCall(apiUrls.crud + id.toString() + '/edit/', 'PUT', data);
        if (result.success) {
            store.dispatch({
                type: 'config/edit',
                payload: {
                    id,
                    data: result.data
                }
            });
            this.toggleModal('mainModal');
        } else {
            store.dispatch({
                type: 'config/err',
                payload: {data: result.data}
            });
        }
    }

    async handleChange (event) {
        event.preventDefault();
        const data = Tools.formDataToObj(event.target);
        if (!this.state.id) {
            this.handleAdd(data);
        } else {
            this.handleEdit(this.state.id, data);
        }
    }

    async handleRemove (id: string) {
        const listId = id.split(',');
        if (!listId.length) return;
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
            store.dispatch({
                type: 'config/remove',
                payload: {id}
            });
        } else {
            this.list();
        }
    }

    toggleModal (modalId: string, id: ?number = null) {
        let state = {id};
        state[modalId] = !this.state[modalId]
        switch (modalId) {
            case 'mainModal':
                if (id) {
                    Tools.apiCall(apiUrls.crud + id.toString(), 'GET').then(result => {
                        if (result.success) {
                            store.dispatch({
                                type: 'config/obj',
                                payload: {data: result.data}
                            });
                        }
                        this.setState(state);
                    });
                    return;
                } else {
                    store.dispatch({
                        type: 'config/obj',
                        payload: {data: {}}
                    });
                    store.dispatch({
                        type: 'config/err',
                        payload: {data: {}}
                    });
                }
                break;
        }
        this.setState(state);
    }

    renderMainModal (defaultValue: Object = {}, errorMessage: Object = {}) {
        const modalId = 'mainModal';
        return (
            <CustomModal
                open={this.state[modalId]}
                close={() => this.toggleModal(modalId)}
                title="Update profile"
                size="md">
                <div>
                    <ConfigForm
                        formId="updateProfileForm"
                        defaultValue={defaultValue}
                        errorMessage={errorMessage}
                        submitTitle="Update profile"
                        handleSubmit={this.handleChange}>
                        <button
                            type="button"
                            onClick={() => this.toggleModal(modalId)}
                            className="btn btn-warning">
                            <span className="oi oi-x"></span>&nbsp;
                            Cancel
                        </button>
                    </ConfigForm>
                </div>
            </CustomModal>
        );
    }

    renderRows () {
        const listItem = this.props.configReducer.list;
        return listItem.map((item, key) => (
            <tr key={key}>
                <th className="row25">
                    <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={ event => {
                            store.dispatch({
                                type: 'config/edit', 
                                payload: {
                                    data: {checked: event.target.checked},
                                    id: item.id
                                }
                            })
                        }}/>
                </th>
                <td>
                    {item.uid}
                </td>
                <td>
                    {item.value}
                </td>
                <td className="center">
                    <span 
                        className="oi oi-pencil text-info pointer"
                        onClick={() => this.toggleModal('mainModal', item.id)}></span>
                    &nbsp;&nbsp;&nbsp;
                    <span 
                        className="oi oi-x text-danger pointer"
                        onClick={() => this.handleRemove(String(item.id))}></span>
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <NavWrapper>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th className="row25">
                                <span 
                                    className="oi oi-check text-info pointer"
                                    onClick={() => (
                                        store.dispatch({
                                            type: 'config/toggleCheckAll'
                                        })
                                    )}></span>
                            </th>
                            <th scope="col">Key</th>
                            <th scope="col">Value</th>
                            <th scope="col" style={{padding: 8}} className="row80">
                                <button 
                                    className="btn btn-primary btn-sm btn-block"
                                    onClick={() => this.toggleModal('mainModal')}>
                                    <span className="oi oi-plus"></span>&nbsp;
                                    Add
                                </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderRows()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th className="row25" colSpan="99">
                                <span 
                                    className="oi oi-x text-danger pointer"
                                    onClick={
                                        () => this.handleRemove(Tools.getCheckedId(this.props.configReducer.list))
                                    }></span>
                            </th>
                        </tr>
                    </tfoot>
                </table>
                {this.renderMainModal(this.props.configReducer.obj, this.props.configReducer.err)}
            </NavWrapper>
        )
    }
}

const styles = {
}

export default withRouter(connect(state => ({
    configReducer: state.configReducer
}), dispatch => ({}))(Config));
