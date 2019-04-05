import { Component } from 'react';
import { AbstractFormikInputWrapperProps } from '../../typings';

class AbstractFormikInputWrapper<V, P> extends Component<P & AbstractFormikInputWrapperProps> {
  onChange(value: V): void {
    const { form, field } = this.props;
    form.setFieldValue(field.name, value);
  }
}

export default AbstractFormikInputWrapper;
