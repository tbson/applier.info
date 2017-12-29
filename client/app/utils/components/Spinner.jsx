// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import styles from './Spinner.styl'

type Props = Object;
type State = Object;


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
