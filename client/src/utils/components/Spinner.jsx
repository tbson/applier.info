// @flow
import * as React from 'react'
// $FlowFixMe: do not complain about importing node_modules
import { connect } from 'react-redux'
// $FlowFixMe: do not complain about importing node_modules
import styles from './Spinner.styl'

type Props = {
    spinning: bool
};
type State = {};


class Spinner extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render () {
        if (!this.props.spinning) return null;
        return (
            <div className={styles.loaderBg}>
                <div className={styles.loader}>Loading...</div>
            </div>
        );
    }
}


export default connect(state => ({
    spinning: state.commonReducer.spinning
}), dispatch => ({}))(Spinner);
