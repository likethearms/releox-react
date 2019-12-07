import React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';
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

it('should switch value', () => {
  const spy = jest.fn();
  const wrapper: ShallowWrapper<any, any, TextArea> = shallow(
    <TextArea label="foo bar" name="bar" />
  );
  const formProps = {
    field: { name: 'bar' },
    form: { setFieldValue: spy },
    errors: {},
  } as any;
  const w = shallow(wrapper.instance().getInputElement(formProps));
  const textarea: ShallowWrapper = w.find('textarea');

  const onB = textarea.prop('onBlur') as Function;
  onB({ target: { value: 'changedValue' } });
  expect(spy).toBeCalledWith('bar', 'changedValue');
});
