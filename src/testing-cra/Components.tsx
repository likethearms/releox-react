import React from 'react';
import { Field } from 'formik';
import { Card } from '../components/Card/Card';
import { FormikFormWrapper } from '../components/FormikFormWrapper/FormikFormWrapper';
import { AsyncSelectFormik } from '../components/AsyncSelect/AsyncSelectFormik';
import { CheckBox } from '../components/Checkbox/CheckBox';
import { CoreuiCheckBox } from '../components/Checkbox/CoreuiCheckBox';

const Components = () => (
  <div className="m-5">
    <Card>
      <FormikFormWrapper<any>
        onSubmit={() => {}}
        initialValues={{ name: '' }}
      >
        <Field name="name" type="input" />
        <AsyncSelectFormik
          getUrl="/Products/"
          queryFormat="mongodb"
          label="Products"
          name="products"
        />
        <CoreuiCheckBox label="Admin" name="admin" />
        <CoreuiCheckBox label="Label" name="Label" />
        <CheckBox label="Admin" name="foo" />
        <CheckBox label="Label" name="bar" />
      </FormikFormWrapper>
    </Card>
  </div>
);

export default Components;
