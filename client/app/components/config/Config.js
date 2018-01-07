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

    constructor(props) {
        super(props);
        this.state = {
            dataLoaded: false
        };
        this.list = this.list.bind(this);
        this.setInitData = this.setInitData.bind(this);
    }

    componentDidMount () {
        this.list();
    }

    setInitData (initData: Object) {
        this.props.configAction(
            'newList', {
                list: [...initData.data.items], pages: initData.data._meta.last_page}
        );
		this.setState({dataLoaded: true});
    }

    async list (outerParams:Object = {}, page:number = 1) {
        let params = {
            page
        };

        if(!Tools.emptyObj(outerParams)){
            params = {...params, ...outerParams};
        }

        const result = Tools.apiCall(apiUrls.crud, 'GET');
        if(result.success){
            this.setInitData(result);
        }
    }

    render() {
        return (
            <NavWrapper>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th className="row25">
                                <span className="oi oi-check text-info pointer"></span>
                            </th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                            <th scope="col" style={{padding: 8}} className="row80">
                                <button className="btn btn-primary btn-sm btn-block">
                                    <span className="oi oi-plus"></span>&nbsp;
                                    Add
                                </button>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th className="row25">
                                <input type="checkbox"/>
                            </th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td className="center">
                                <span className="oi oi-pencil text-info pointer"></span>&nbsp;&nbsp;&nbsp;
                                <span className="oi oi-x text-danger pointer"></span>
                            </td>
                        </tr>
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
}), dispatch => ({}))(Config));
