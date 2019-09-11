import { AbstractFormikInputWrapper, AbstractFormikInputWrapperProps } from './AbstractFormikInputWrapper';

class A extends AbstractFormikInputWrapper<any, AbstractFormikInputWrapperProps> { }

describe('AbstractFormikInputWrapper', () => {
  const inputWrapper = new A({ form: { setFieldValue: () => { } }, field: { name: 'foo' } });

  it('', () => {
    console.log(inputWrapper);
  });
});
