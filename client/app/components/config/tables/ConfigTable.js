// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomModal from 'utils/components/CustomModal';
import { actions, apiUrls } from '../_data';
import ConfigForm from '../forms/ConfigForm';
import ConfigModal from '../forms/ConfigModal';
import LoadingLabel from 'utils/components/LoadingLabel';
import store from 'app/store';
import Tools from 'helpers/Tools';


type Props = {
    configReducer: Object,
};
type States = {
    dataLoaded: bool,
    mainModal: bool,
    id: ?number
};


class ConfigTable extends React.Component<Props, States> {

    list: Function;
    setInitData: Function;
    toggleModal: Function;
    handleSubmit: Function;
    handleAdd: Function;
    handleEdit: Function;
    handleRemove: Function;

    constructor(props: Object) {
        super(props);
        this.state = {
            dataLoaded: false,
            mainModal: false,
            id: null
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.list = this.list.bind(this);
        this.setInitData = this.setInitData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    async handleAdd (params: Object) {
        const result = await Tools.apiCall(apiUrls.crud + 'create/', 'POST', params);
        if (result.success) {
            result.data.checked = false;
            store.dispatch({
                type: 'config/add',
                payload: {
                    data: result.data
                }
            });
            return null;
        }
        return result.data;
    }

    async handleEdit (id: number, params: Object) {
        const result = await Tools.apiCall(apiUrls.crud + id.toString() + '/edit/', 'PUT', params);
        if (result.success) {
            store.dispatch({
                type: 'config/edit',
                payload: {
                    id,
                    data: result.data
                }
            });
            return null;
        } 
        return result.data;
    }

    async handleSubmit (event) {
        event.preventDefault();
        let error: ?Object = null;
        const params = Tools.formDataToObj(event.target);

        if (!this.state.id) {
            error = await this.handleAdd(params);
        } else {
            error = await this.handleEdit(this.state.id, params);
        }
        if (!error) {
            this.toggleModal('mainModal');
        } else {
            store.dispatch({
                type: 'config/err',
                payload: {data: error}
            });
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

    render() {
        if (!this.state.dataLoaded) return (<LoadingLabel/>);
        const list = this.props.configReducer.list;
        return (
            <div>
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
                        {
                            list.map((data, key) => (
                                <Row 
                                    data={data}
                                    key={key} _key={key}
                                    toggleModal={this.toggleModal}
                                    handleRemove={this.handleRemove}/>
                            ))
                        }
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
                <ConfigModal
                    open={this.state.mainModal}
                    defaultValue={this.props.configReducer.obj}
                    errorMessage={this.props.configReducer.err}
                    handleClose={() => this.setState({mainModal: false})}
                    handleSubmit={this.handleSubmit}/>
            </div>
        );
    }
}


type RowPropTypes = {
    data: Object,
    _key: number,
    toggleModal: Function,
    handleRemove: Function
}
export class Row extends React.Component<RowPropTypes> {

    render () {
        const data = this.props.data;
        return (
            <tr key={this.props._key}>
                <th className="row25">
                    <input
                        type="checkbox"
                        checked={data.checked}
                        onChange={ event => {
                            store.dispatch({
                                type: 'config/edit', 
                                payload: {
                                    data: {checked: event.target.checked},
                                    id: data.id
                                }
                            })
                        }}/>
                </th>
                <td>
                    {data.uid}
                </td>
                <td>
                    {data.value}
                </td>
                <td className="center">
                    <span 
                        className="oi oi-pencil text-info pointer"
                        onClick={() => this.props.toggleModal('mainModal', data.id)}></span>
                    &nbsp;&nbsp;&nbsp;
                    <span 
                        className="oi oi-x text-danger pointer"
                        onClick={() => this.props.handleRemove(String(data.id))}></span>
                </td>
            </tr>
        );
    }
}

export default withRouter(connect(state => ({
    configReducer: state.configReducer
}), dispatch => ({}))(ConfigTable));
