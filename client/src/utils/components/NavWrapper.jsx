// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import Tools from 'src/utils/helpers/Tools';
import './NavWrapper.css'

type Props = Object;

type State = Object;

class App extends React.Component<Props, State> {
    toggleAll: Function;
    mediaQueryChanged: Function;

    constructor(props) {
        super(props);
        this.state = {
            toggled: true
        }
        this.toggleAll = this.toggleAll.bind(this);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    }

    componentDidMount () {
        const mql = window.matchMedia(`(min-width: 800px)`);
        mql.addListener(this.mediaQueryChanged);
        this.setState({mql: mql});

        this.setState({
            toggled: window.innerWidth >= 800 ? true : false
        });
    }

    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }

    mediaQueryChanged () {
        console.log("media change");
        this.setState({
            toggled: !this.state.toggled
        });
    }

    toggleAll (e) {
        this.setState({
            toggled: !this.state.toggled
        });
    }

    logout () {
        Tools.removeStorage('authData');
        Tools.navigateTo('login');
    }

    render() {
        return (
            <div id="wrapper" className={this.state.toggled?'toggled':''}>
                <div id="sidebar-wrapper">
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">
                            APPLIER
                        </li>

                        <li>
                            <NavLink exact to="/">
                                <span className="oi oi-person"></span>&nbsp;&nbsp;
                                <span>
                                    Profile
                                </span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink exact to="/config">
                                <span className="oi oi-cog"></span>&nbsp;&nbsp;
                                <span>
                                    Config
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div id="page-content-wrapper">
                    <div id="main-heading">
                        <span
                            id="nav-toggler"
                            onClick={() => this.toggleAll()}>
                            &#9776;</span>
                        <span>Tran Bac Son</span>
                        &nbsp;&nbsp;
                        <span
                            className="oi oi-account-logout pointer"
                            onClick={() => this.logout()}></span>
                    </div>

                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
            </div>
    )
    }
}

export default withRouter(connect(state => ({}), dispatch => ({}))(App));

