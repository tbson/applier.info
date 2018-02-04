import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Row, ConfigTable } from '../tables/ConfigTable';

Enzyme.configure({ adapter: new Adapter() });


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
        action: jest.fn()
    };

    beforeAll(() => {
        wrapper = shallow(<Row {...props}/>);
    });

    it('Check output value', () => {
        expect(wrapper.contains(
                <td className="uid">
                    key1
                </td>
            )
        ).toEqual(true);
        expect(wrapper.contains(
                <td className="value">
                    value 1
                </td>
            )
        ).toEqual(true);
    });


    it('Check', () => {
        wrapper.find('.check').first().simulate('change', {target: {checked: true}});
        expect(props.action.mock.calls.length).toEqual(1);
        expect(props.action.mock.calls[0][0]).toEqual('edit');
        expect(props.action.mock.calls[0][1]).toEqual({
            data: {checked: true},
            id: 1
        });
    });

    it('Toggle modal', () => {
        wrapper.find('.editBtn').first().simulate('click');
        expect(props.toggleModal.mock.calls.length).toEqual(1);
        expect(props.toggleModal.mock.calls[0][0]).toEqual('mainModal');
        expect(props.toggleModal.mock.calls[0][1]).toEqual(1);
    });

    it('Remove', () => {
        wrapper.find('.removeBtn').first().simulate('click');
        expect(props.handleRemove.mock.calls.length).toEqual(1);
        expect(props.handleRemove.mock.calls[0][0]).toEqual('1');
    });

});


describe('ConfigTable component', () => {
    let wrapper;
    const props = {
        configReducer: {},
        action: jest.fn()
    };

    beforeAll(() => {
        wrapper = shallow(<ConfigTable {...props}/>);
    });

    it('Get list', () => {

    });

    it('Check all', () => {

    });

    it('Number of rows', () => {

    });

    it('Add', () => {

    });

    it('Edit', () => {

    });

    it('Remove', () => {

    });
});

