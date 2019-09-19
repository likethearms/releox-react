import { Component } from 'react';
import { FormikValues } from 'formik';

export interface AbstractFormikInputWrapperProps {
  field: FormikValues;
  form: { setFieldValue: Function };
}

export abstract class AbstractFormikInputWrapper<V, P> extends Component<
  P & AbstractFormikInputWrapperProps
> {
  onChange(value: V): void {
    const { form, field } = this.props;
    form.setFieldValue(field.name, value);
  }
}
