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
  expect(wrapper.find('#bar-input')).toHaveLength(1);
});

it('should implement props', () => {
  const wrapper = mount(
    <Formik onSubmit={(x) => x} initialValues={{ bar: '' }}>
      {() => (
        <TextArea rows={10} name="bar" id="id-foo" label="foo bar" className="classname-foo" />
      )}
    </Formik>
  );
  expect(wrapper.find('#id-foo')).toHaveLength(2);
  expect(wrapper.find('.classname-foo')).toHaveLength(2);
  expect(wrapper.find('[placeholder="foo bar"]')).toHaveLength(1);
});
