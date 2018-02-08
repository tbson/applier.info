// @flow
type ConfigStateType = {
    pages: number,
    obj: Object,
    err: Object,
    list: Array<Object>,
};


const configStateDefault: ConfigStateType = {
    pages: 0,
    obj: {},
    err: {},
    list: []
};

export default function configState(
    state: ConfigStateType = configStateDefault,
    action: {type: string, payload: any}): ConfigStateType{
    const prefix = 'config' + '/';
    const {data, pages, id} = (action.payload ? action.payload : {});
    switch(action.type){
        case prefix + 'obj':
            return {
                ...state,
                obj: {...data}
            };
        case prefix + 'err':
            return {
                ...state,
                err: {...data}
            };
        case prefix + 'list':
            // Update checked to false
            const newData = data.map(item => {
                item.checked = !!item.checked;
                return item;
            });
            return {
                ...state,
                list: [...newData],
                pages: pages
            };
        case prefix + 'add':
            return {
                ...state,
                list: [{...data}, ...state.list]
            };
        case prefix + 'edit':
            const index = state.list.findIndex(item => item.id===id);
            return {
                ...state,
                list: [
                    ...state.list.slice(0, index),
                    {...state.list.slice(index, index + 1)[0], ...data},
                    ...state.list.slice(index + 1)
                ]
            };
        case prefix + 'remove':
            const listId = id.split(',').map(item => parseInt(item));
            const newList1 = state.list.filter(item => listId.indexOf(item.id) === -1);
            return {
                ...state,
                list: newList1
            };
        case prefix + 'toggleCheckAll':
            var newList = [];
            const checkedItem = state.list.filter(item => item.checked);
            function result (checked: bool) {
                return {
                    ...state,
                    list: state.list.map(value => {
                        return {...value, checked};
                    })
                };
            }
            if (checkedItem) {
                if (checkedItem.length === state.list.length) {
                    // Checked all -> uncheck all
                    return result(false);
                }
                // Some item checked -> checke all
                return result(true);
            } else {
                // Nothing checked -> check all
                return result(true);
            }
        default:
            return state;
    }
}
