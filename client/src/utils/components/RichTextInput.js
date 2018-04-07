// @flow
import * as React from 'react';
import ReactSummernoteLoader from './ReactSummerNoteLoader';

type Props = {
    name: string,
    defaultValue: any,
};

type States = {
    value: string,
    ReactSummernote: ?Object,
};

class RichTextInput extends React.Component<Props, States> {
    state = {
        value: '',
        ReactSummernote: null,
    };
    static defaultProps = {
        options: [],
        multi: false,
        delimiter: ',',
        defaultValue: '',
    };

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        const {defaultValue} = this.props;
        this.setState({
            value: defaultValue ? defaultValue : '',
        });
        ReactSummernoteLoader().then(ReactSummernote => {
            this.setState({...ReactSummernote});
        });
    }

    render() {
        if (!this.state.ReactSummernote) {
            return null;
        }
        const ReactSummernote = this.state.ReactSummernote.default;
        return (
            <ReactSummernote
                value={this.state.value}
                options={{
                    maxHeight: 300,
                    dialogsInBody: true,
                    toolbar: [
                        ['style', ['style']],
                        ['font', ['bold', 'underline', 'clear']],
                        ['fontname', ['fontname']],
                        ['para', ['ul', 'ol', 'paragraph']],
                        ['table', ['table']],
                        ['insert', ['link', 'picture', 'video']],
                        ['view', ['fullscreen', 'codeview']],
                    ],
                }}
            />
        );
    }
}

const styles = {};
export default RichTextInput;
