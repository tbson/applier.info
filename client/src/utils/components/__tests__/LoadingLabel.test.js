import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import LoadingLabel from '../LoadingLabel';

Enzyme.configure({ adapter: new Adapter() });


describe('LoadingLabel component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<LoadingLabel />).exists(
            <div className="alert alert-info" role="alert">Loading data...</div>)
        ).toBe(true)
    });
});

