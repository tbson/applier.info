// @flow
type ConfigReducerType = {
    pages: number,
    obj: Object,
    list: Array<Object>,
};


const configReducerDefault: ConfigReducerType = {
    pages: 0,
    obj: {},
    list: []
};

export default function configReducer(
    state: ConfigReducerType = configReducerDefault,
    action: {type: string, payload: any}): ConfigReducerType{
    const prefix = 'config' + '/';
    const {data, pages, index} = (action.payload ? action.payload : {});
    switch(action.type){
        case prefix + 'obj':
            return {
                ...state,
                obj: {...state.obj, ...data}
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
            return {
                ...state,
                list: [
                    ...state.list.slice(0, index),
                    {...state.list.slice(index, index + 1)[0], ...data},
                    ...state.list.slice(index + 1)
                ]
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
        /*
        case prefix + 'checkAll':
            return {
                ...state,
                list: state.list.map(value => {
                    return {...value, checked: true};
                })
            };
        case prefix + 'uncheckAll':
            return {
                ...state,
                list: state.list.map(value => {
                    return {...value, checked: false};
                })
            };
        */
        default:
            return state;
    }
}
