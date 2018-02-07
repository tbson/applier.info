import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {Row, ConfigTable} from '../tables/ConfigTable';
import Tools from 'src/utils/helpers/Tools';

Enzyme.configure({adapter: new Adapter()});

function seeding(numberOfItems) {
    let result = [];
    for (let i = 1; i <= numberOfItems; i++) {
        result.push({
            id: i,
            uid: 'key' + String(i),
            value: 'value ' + String(i),
            checked: false,
        });
    }
    return result;
}

describe('ConfigTable Row component', () => {
    let wrapper;
    const props = {
        _key: 0,
        data: {
            id: 1,
            uid: 'key1',
            value: 'value 1',
        },
        toggleModal: jest.fn(),
        handleRemove: jest.fn(),
        action: jest.fn(),
    };

    beforeAll(() => {
        wrapper = shallow(<Row {...props} />);
    });

    it('Check output value', () => {
        expect(wrapper.contains(<td className="uid">key1</td>)).toEqual(true);
        expect(wrapper.contains(<td className="value">value 1</td>)).toEqual(true);
    });

    it('Check', () => {
        wrapper
            .find('.check')
            .first()
            .simulate('change', {target: {checked: true}});
        expect(props.action.mock.calls.length).toEqual(1);
        expect(props.action.mock.calls[0][0]).toEqual('edit');
        expect(props.action.mock.calls[0][1]).toEqual({
            data: {checked: true},
            id: 1,
        });
    });

    it('Toggle modal', () => {
        wrapper
            .find('.editBtn')
            .first()
            .simulate('click');
        expect(props.toggleModal.mock.calls.length).toEqual(1);
        expect(props.toggleModal.mock.calls[0][0]).toEqual('mainModal');
        expect(props.toggleModal.mock.calls[0][1]).toEqual(1);
    });

    it('Remove', () => {
        wrapper
            .find('.removeBtn')
            .first()
            .simulate('click');
        expect(props.handleRemove.mock.calls.length).toEqual(1);
        expect(props.handleRemove.mock.calls[0][0]).toEqual('1');
    });
});

describe('ConfigTable component', () => {
    beforeAll(() => {
        Tools.apiCall = (url, method, params = {}, popMessage = true, usingLoading = true) =>
            new Promise((resolve, reject) => {
                resolve({
                    status: 200,
                    success: true,
                    data: {
                        count: 1,
                        pages: 1,
                        page_size: 10,
                        links: {next: null, previous: null},
                        items: seeding(10),
                    },
                });
            });
    });

    it('Get list', () => {
        const props = {
            configReducer: {
                pages: 1,
                obj: {},
                err: {},
                list: seeding(10),
            },
            action: jest.fn(),
        };

        const wrapper = shallow(<ConfigTable {...props} />);
        expect(wrapper.find('.tableRow')).toHaveLength(10);
    });

    it('Check all', () => {});

    it('Number of rows', () => {});

    it('Add', () => {});

    it('Edit', () => {});

    it('Remove', () => {});
});
