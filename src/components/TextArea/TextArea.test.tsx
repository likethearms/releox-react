import React from 'react';
import { mount } from 'enzyme';
import { Formik } from 'formik';
import { TextArea } from './TextArea';

it('should show textArea', () => {
  const wrapper = mount(
    <Formik onSubmit={(x) => x} initialValues={{ bar: '' }}>
      {() => <TextArea name="bar" label="FOO BAR" />}
    </Formik>
  );
  expect(wrapper.find('#bar-input').length).toBe(1);
});

it('should implement props', () => {
  const wrapper = mount(
    <Formik onSubmit={(x) => x} initialValues={{ bar: '' }}>
      {() => (
        <TextArea rows={10} name="bar" id="id-foo" label="foo bar" className="classname-foo" />
      )}
    </Formik>
  );
  expect(wrapper.find('#id-foo').length).toBe(2);
  expect(wrapper.find('.classname-foo').length).toBe(2);
  expect(wrapper.find('textarea[name="bar"]').length).toBe(1);
  expect(wrapper.find('[placeholder="foo bar"]').length).toBe(1);
});
