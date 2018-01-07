// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomModal from 'utils/components/CustomModal';
import { actions, apiUrls } from './_data';
import store from 'app/store';
import Tools from 'helpers/Tools';
import NavWrapper from 'utils/components/NavWrapper';


type Props = Object;
type States = {
    dataLoaded: bool
};


class Config extends React.Component<Props, States> {
    list: Function;
    setInitData: Function;
    renderRows: Function;

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
        this.list = this.list.bind(this);
        this.setInitData = this.setInitData.bind(this);
        this.renderRows = this.renderRows.bind(this);
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

    renderRows () {
        const listItem = this.props.configReducer.list;
        return listItem.map((item, key) => (
            <tr key={key}>
                <th className="row25">
                    <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={ event => (
                            store.dispatch({
                                type: 'config/edit', 
                                payload: {
                                    data: {checked: event.target.checked},
                                    index: key
                                }
                            })
                        )}/>
                </th>
                <td>
                    {item.uid}
                </td>
                <td>
                    {item.value}
                </td>
                <td className="center">
                    <span className="oi oi-pencil text-info pointer"></span>&nbsp;&nbsp;&nbsp;
                    <span className="oi oi-x text-danger pointer"></span>
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
                                <button className="btn btn-primary btn-sm btn-block">
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
                                <span className="oi oi-x text-danger pointer"></span>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </NavWrapper>
        )
    }
}

const styles = {
}

export default withRouter(connect(state => ({
    configReducer: state.configReducer
}), dispatch => ({}))(Config));
