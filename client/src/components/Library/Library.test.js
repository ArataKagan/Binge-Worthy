import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Library } from './Library';

import { Link } from 'react-router-dom';

configure({adapter: new Adapter()});

describe('Library', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Library />);
    })
    it('should exists', () => {
        expect(wrapper.exists()).toBe(true);
    });
    it('should have library element', () => {
        expect(wrapper.exists('.Cards')).toBe(true);
    });
    it('invokes `componentDidMount` when mounted', () => {
        const spy = jest.spyOn(Library.prototype, 'componentDidMount');
        var wrapper = mount(<Library />);
        wrapper.instance().componentDidMount();
        expect(spy).toHaveBeenCalled();
    });

});