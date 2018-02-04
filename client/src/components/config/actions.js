// @flow
export default function configAction(action: string, payload: ?Object): Object{
    const prefix = 'config' + '/';
    const type = prefix + action;
    const actions = [
        'obj',
        'err',
        'list',
        'add',
        'edit',
        'remove',
        'toggleCheckAll'
    ];
    if (actions.indexOf(action) !== -1) return { type, payload };
    return {};
}
