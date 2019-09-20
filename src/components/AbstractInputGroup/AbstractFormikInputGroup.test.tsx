import React from 'react';
import { AbstractFormikInputGroup } from './AbstractFormikInputGroup';

class A extends AbstractFormikInputGroup<any> {
  getElement() {
    return <span />;
  }
}
const a = new A({});

describe('AbstractFormikInputGroup', () => {
  it('should return empty if bag doesnt contain error', () => {
    const fieldProps: any = { field: { name: 'foo' }, form: { touched: {}, errors: {} } };
    expect(a.getInvalidClass(fieldProps)).toBe('');
  });

  it('should return is-invalid if bag contain error', () => {
    const fieldProps: any = {
      field: { name: 'foo' },
      form: { touched: { foo: true }, errors: { foo: 'error' } },
    };
    expect(a.getInvalidClass(fieldProps)).toBe('is-invalid');
  });
});
