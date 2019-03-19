import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';
import ReactLoading from 'react-loading';
import CenterContent from '../CenterContent/CenterContent';

it('should have blue color by default', () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper.find(ReactLoading).prop('color')).toBe('#20A8D8');
});

it('should have spin type by default', () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper.find(ReactLoading).prop('type')).toBe('spin');
});

it('should center element by default', () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper.find(CenterContent).length).toBe(1);
});

it('should turn center align off when needed', () => {
  const wrapper = shallow(<Loading centeredVertical={false} />);
  expect(wrapper.find(CenterContent).length).toBe(0);
});

it('should change color', () => {
  const wrapper = shallow(<Loading color="red" />);
  expect(wrapper.find(ReactLoading).prop('color')).toBe('red');
});
