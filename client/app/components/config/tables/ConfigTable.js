// @flow
import * as React from 'react';
import CustomModal from 'utils/components/CustomModal';
import ConfigForm from '../forms/ConfigForm';
import store from 'app/store';
import Tools from 'helpers/Tools';


type Props = {
    list: Array<Object>,
    getItem: Function,
    handleChange: Function,
    handleRemove: Function
};
type States = {
    mainModal: bool,
    id: ?number
};


class ConfigTable extends React.Component<Props, States> {

    constructor(props: Object) {
        super(props);
        this.state = {
            mainModal: false,
            id: null
        };
    }

    toggleModal (modalId: string, id: ?number = null) {
        let state = {id};
        state[modalId] = !this.state[modalId]
        switch (modalId) {
            case 'mainModal':
                if (id) {
                    this.props.getItem(id).then(result => {
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
                title="Update config"
                size="md">
                <div>
                    <ConfigForm
                        formId="updateProfileForm"
                        defaultValue={defaultValue}
                        errorMessage={errorMessage}
                        submitTitle="Update profile"
                        handleSubmit={this.props.handleChange}>
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
        const listItem = this.props.list;
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
                        onClick={() => this.props.handleRemove(String(item.id))}></span>
                </td>
            </tr>
        ));
    }

    render() {
        return (
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
                                    () => this.props.handleRemove('all'))
                                }></span>
                        </th>
                    </tr>
                </tfoot>
            </table>
        );
    }
}

export default ConfigTable;
