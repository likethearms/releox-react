import React from 'react';
import { mount } from "enzyme";
import FormikFormWrapper from "./FormikFormWrapper";

const onSubmit = jest.fn();
const wrapper = mount((
  <FormikFormWrapper<any>
    onSubmit={onSubmit}
    initialValues={{ name: '' }}>
    <p>Test</p>
  </FormikFormWrapper>
));

it('should call onSubmit', () => {
  const onS = wrapper.find('Formik').prop('onSubmit') as Function;
  onS();
  expect(onSubmit).toBeCalledTimes(1);
});

it('should have form onSubmit', () => {
  const onSubmitMethod = wrapper.find('form').prop('onSubmit');
  expect(typeof onSubmitMethod).toBe('function');
});

it('should implement initValues', () => {
  const initialValues = wrapper.find('Formik').prop('initialValues');
  expect(initialValues).toEqual({ name: '' });
});

