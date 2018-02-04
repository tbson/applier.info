// @flow
export default function ConfigAction(action: string, payload: ?Object): Object{
    const prefix = 'config' + '/';
    const type = prefix + action;
    switch(action){
        case 'obj':
        case 'err':
        case 'list':
        case 'add':
        case 'edit':
        case 'remove':
            return { type, payload };
        case 'toggleCheckAll':
            return { type };
        default:
            return {};
    }
}
