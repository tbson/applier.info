import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Card, Modal } from 'antd';
import { actions } from './_data';
import FormLogin from './forms/FormLogin';
import store from 'app/store';
const { Header, Sider, Content } = Layout;

@connect(state => ({
    mainModalVisible: state.authReducer.mainModalVisible
}), dispatch => ({}))
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderMainModal = this.renderMainModal.bind(this);
    }

    renderMainModal(){

    }

    render() {
        return (
            <Row>
                <Col
                    md={{span: 8, offset: 8}}
                    sm={{span: 16, offset: 4}}
                    style={styles.layoutWrapper}>
                    <Card title="Login" bordered={true} style={{ width: '100%' }}>
                        <FormLogin/>
                        <MainModal visible={this.props.mainModalVisible}/>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const MainModal = ({visible}) => {
    return (
        <Modal
            title="Forgot password"
            onCancel={()=>store.dispatch({type: actions.TOGGLE_MAIN_MODAL, payload: false})}
            visible={visible}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
}

const styles = {
}

export default withRouter(Login);
