import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Row } from '../tables/ConfigTable';

Enzyme.configure({ adapter: new Adapter() });


describe('ConfigTable component', () => {
    it('should render without throwing an error', () => {
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
        const wrapper = shallow(<Row {...props}/>);
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

        wrapper.find('.check').first().simulate('change', {target: {checked: true}});
        expect(props.action.mock.calls[0][0]).toEqual('edit');
        expect(props.action.mock.calls[0][1]).toEqual({
            data: {checked: true},
            id: 1
        });
    });
});
