// @flow
import * as React from 'react';
import CustomModal from 'src/utils/components/CustomModal';
import ConfigForm from './ConfigForm';


type PropTypes = {
    open: bool,
    handleClose: Function,
    handleSubmit: Function,
    defaultValue: Object,
    errorMessage: Object
}
class ConfigModal extends React.Component<PropTypes> {
    static defaultProps = {
        open: false
    };

    render () {
        if (!this.props.open) return null;
        return (
            <CustomModal
                open={true}
                close={this.props.handleClose}
                title="Update config"
                size="md">
                <div>
                    <ConfigForm
                        formId="configForm"
                        submitTitle="Update"
                        defaultValue={this.props.defaultValue}
                        errorMessage={this.props.errorMessage}
                        handleSubmit={this.props.handleSubmit}>
                        <button
                            type="button"
                            onClick={this.props.handleClose}
                            className="btn btn-warning">
                            <span className="oi oi-x"></span>&nbsp;
                            Cancel
                        </button>
                    </ConfigForm>
                </div>
            </CustomModal>
        );
    }
}
export default ConfigModal;

