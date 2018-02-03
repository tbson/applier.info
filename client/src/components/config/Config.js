// @flow
import * as React from 'react';
// $FlowFixMe: do not complain about importing node_modules
import { connect } from 'react-redux';
// $FlowFixMe: do not complain about importing node_modules
import { withRouter } from 'react-router-dom';
import { actions, apiUrls } from './_data';
import store from 'src/store';
import NavWrapper from 'src/utils/components/NavWrapper';
import ConfigTable from './tables/ConfigTable';


type Props = {};
type States = {};


class Config extends React.Component<Props, States> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <NavWrapper>
                <ConfigTable/>
            </NavWrapper>
        )
    }
}

const styles = {
}

export default withRouter(connect(state => ({
    configReducer: state.configReducer
}), dispatch => ({}))(Config));
