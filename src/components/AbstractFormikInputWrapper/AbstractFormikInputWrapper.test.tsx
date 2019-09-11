import { AbstractFormikInputWrapper, AbstractFormikInputWrapperProps } from './AbstractFormikInputWrapper';

class A extends AbstractFormikInputWrapper<string, AbstractFormikInputWrapperProps> { }

describe('AbstractFormikInputWrapper', () => {
  const spy = jest.fn();
  const inputWrapper = new A({ form: { setFieldValue: spy }, field: { name: 'foo' } });

  it('', () => {
    inputWrapper.onChange('Bar');
    expect(spy).toBeCalledWith('foo', 'Bar');
  });
});
