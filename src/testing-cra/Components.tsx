import React from 'react';
import { Formik } from 'formik';
import { Card } from '../components/Card/Card';
import { AsyncSelectFormik } from '../components/AsyncSelect/AsyncSelectFormik';
import { CoreuiCheckBox } from '../components/Checkbox/CoreuiCheckBox';
import { Input } from '../components/Input/Input';
import { CheckBox } from '../components/Checkbox/CheckBox';
import { TextArea } from '../components/TextArea/TextArea';
import { AsyncSelect } from '../components/AsyncSelect/AsyncSelect';

const Components = () => (
  <div className="m-5">
    <Card>
      <Formik onSubmit={() => {}} initialValues={{ name: '' }}>
        <AsyncSelectFormik
          getUrl="/Products/"
          queryFormat="mongodb"
          label="Products"
          name="products"
        />
        <AsyncSelectFormik
          label="Products"
          name="products"
          getUrl="/Products/"
          queryFormat="mongodb"
          id=""
          inline
          inlineLabelWidth={4}
          labelClass=""
        />
        <AsyncSelect
          getUrl="/Products/"
          queryFormat="mongodb"
          onError={() => {}}
          searchFields={[]}
          onChange={() => {}}
          placeholder=""
          mapLabel=""
          mapValue=""
        />
        <TextArea name="foofoo" label="Foofoo" />
        <TextArea inline inlineLabelWidth={2} name="barbar" label="Barbar" />
        <Input inline name="hello" label="Hello" />
        <Input labelClass="text-right" inline name="hello" label="Hello" />
        <Input labelClass="text-right" inlineLabelWidth={2} inline name="hello" label="Hello" />
        <Input inlineLabelWidth={10} inline name="hello" label="Hello" />
        <CoreuiCheckBox label="Admin" name="admin" />
        <CoreuiCheckBox label="Label" name="Label" />
        <CheckBox label="Admin" name="foo" />
        <CheckBox label="Label" name="bar" />
      </Formik>
    </Card>
  </div>
);

export default Components;
