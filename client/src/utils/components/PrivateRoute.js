// @flow
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Tools from 'src/utils/helpers/Tools';

type Props = Object;

export default class PrivateRoute extends React.Component<Props> {
    render() {
        if(Tools.getToken()){
            return  (<Route {...this.props}/>);
        }
        return (
            <Redirect to={{
                push: true,
                pathname: '/login',
                state: { from: this.props.location }
            }}/>
        )
    }
}
