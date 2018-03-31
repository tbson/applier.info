// @flow
import * as React from 'react';

type Props = {
    options: Object,
    name: string,
    defaultValue: string,
};

type States = {
    value: string,
    options: Object,
};

class PermissionsInput extends React.Component<Props, States> {
    state = {
        options: this.props.options,
        value: '',
    };
    static defaultProps = {
        options: [],
        defaultValue: '',
    };

    constructor(props: Props) {
        super(props);
    }

    handleChange = (value, item) => {
        let result = [];
        item.checked = value;
        this.setState({options: this.state.options}, () => {
            for (let contentType in this.state.options) {
                let permissionGroup = this.state.options[contentType]
                for (let permission of permissionGroup) {
                    if (permission.checked) {
                        result.push(permission.id);
                    }
                }
            }
            this.setState({value: result.join(',')})
        });
    };

    render() {
        const { options } = this.state;
        return (
            <div className="container">
                <input type="hidden" name={this.props.name} defaultValue={this.state.value} />
                {
                    Object.entries(options).map(([key, permissions]) => (
                        <div key={key}>
                            <div className="row"><strong>{key}</strong></div>
                            <div className="row">
                            {
                                permissions.map(item => (
                                    <div className="form-check col-md-6" key={item.id}>
                                        <input
                                            id={item.codename}
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={item.checked}
                                            onChange={(event) => this.handleChange(event.target.checked, item)}/>
                                        <label className="form-check-label" htmlFor={item.codename}>{item.name}</label>
                                    </div>
                                ))
                            }
                            </div>
                            <hr/>
                        </div>
                    ))
                }
            </div>
        );
    }
}

const styles = {};
export default PermissionsInput;
