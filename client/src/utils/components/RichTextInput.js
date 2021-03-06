// @flow
import * as React from 'react';
// $FlowFixMe: do not complain about importing node_modules
import {convertToRaw} from 'draft-js';
// $FlowFixMe: do not complain about importing node_modules
import {Editor, createEditorState, addNewBlock, Block, ImageSideButton} from 'medium-draft';
// $FlowFixMe: do not complain about importing node_modules
import mediumDraftExporter from 'medium-draft/lib/exporter';
// $FlowFixMe: do not complain about importing node_modules
import mediumDraftImporter from 'medium-draft/lib/importer';
// $FlowFixMe: do not complain about importing node_modules
import 'medium-draft/lib/index.css';
import Tools from '../helpers/Tools';

const rawApiUrls: Array<Object> = [
    {
        controller: 'attach',
        endpoints: {
            crud: '',
        },
    },
];

export const apiUrls = Tools.getApiUrls(rawApiUrls);

type Props = {
    parent_uuid: string,
    name: string,
    defaultValue: any,
};

type States = {
    value: string,
    editorState: Object,
};

class RichTextInput extends React.Component<Props, States> {
    onChange: Function;
    sideButtons: Array<Object>;

    state = {
        value: '',
        editorState: createEditorState(convertToRaw(mediumDraftImporter(this.props.defaultValue))),
    };
    static defaultProps = {
        options: [],
        multi: false,
        delimiter: ',',
        defaultValue: '',
        parent_uuid: '',
        parent: null,
    };

    constructor(props: Props) {
        super(props);
        // this.imageUploadHanlde = this.imageUploadHanlde.bind(this);
        this.onChange = editorState => {
            this.setState({
                editorState,
                value: mediumDraftExporter(editorState.getCurrentContent()),
            });
        };
        this.sideButtons = [
            {
                title: 'Image',
                component: props => {
                    return <CustomImageSideButton {...props} {...this.props} />;
                },
            },
        ];
    }

    render() {
        const {editorState} = this.state;
        return (
            <div style={{position: 'relative'}}>
                <input type="hidden" name={this.props.name} defaultValue={this.state.value} />
                <Editor
                    ref="editor"
                    placeholder="Content..."
                    editorState={editorState}
                    onChange={this.onChange}
                    sideButtons={this.sideButtons}
                />
            </div>
        );
    }
}

const styles = {};
export default RichTextInput;

class CustomImageSideButton extends ImageSideButton {
    async onChange(e) {
        const file = e.target.files[0];
        if (file.type.indexOf('image/') === 0) {
            const params = {
                attachment: file,
                parent_uuid: this.props.parent_uuid,
                richtext_image: true,
            };
            const result = await Tools.apiCall(apiUrls.crud, 'POST', params);
            if (result.success) {
                this.props.setEditorState(
                    addNewBlock(this.props.getEditorState(), Block.IMAGE, {
                        className: 'full-width',
                        src: result.data.attachment,
                    }),
                );
            }
        }
        this.props.close();
    }
}
