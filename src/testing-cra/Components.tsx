import React from 'react';
import { Card } from '../components/Card/Card';
import { FormikFormWrapper } from '../components/FormikFormWrapper/FormikFormWrapper';
import { AsyncSelectFormik } from '../components/AsyncSelect/AsyncSelectFormik';
import { CoreuiCheckBox } from '../components/Checkbox/CoreuiCheckBox';
import { Input } from '../components/Input/Input';
import { CheckBox } from '../components/Checkbox/CheckBox';

const Components = () => (
  <div className="m-5">
    <Card>
      <FormikFormWrapper<any>
        onSubmit={() => { }}
        initialValues={{ name: '' }}
      >
        <AsyncSelectFormik
          getUrl="/Products/"
          queryFormat="mongodb"
          label="Products"
          name="products"
        />
        <Input inline name="hello" label="Hello" />
        <Input labelClass="text-right" inline name="hello" label="Hello" />
        <Input inline name="hello" label="Hello" />
        <Input labelClass="text-right" inlineLabelWidth={2} inline name="hello" label="Hello" />
        <Input inlineLabelWidth={10} inline name="hello" label="Hello" />
        <CoreuiCheckBox label="Admin" name="admin" />
        <CoreuiCheckBox label="Label" name="Label" />
        <CheckBox label="Admin" name="foo" />
        <CheckBox label="Label" name="bar" />
      </FormikFormWrapper>
    </Card>
  </div>
);

export default Components;
