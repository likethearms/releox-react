import {
  AbstractFormikInputWrapper,
  AbstractFormikInputWrapperProps,
} from './AbstractFormikInputWrapper';

class A extends AbstractFormikInputWrapper<string, AbstractFormikInputWrapperProps> {}

const spy = jest.fn();
const inputWrapper = new A({ form: { setFieldValue: spy }, field: { name: 'foo' } });

it('should call onChange with value to be as expected ', () => {
  inputWrapper.onChange('Bar');
  expect(spy).toBeCalledWith('foo', 'Bar');
});
