import React from 'react';
import { Formik, Form } from 'formik';
import { Card } from '../components/Card/Card';
import { Input } from '../components/form/Input/Input';
import { TextArea } from '../components/form/TextArea/TextArea';
import { Select } from '../components/form/Select/Select';
import { ReactSelect } from '../components/form/ReactSelect/ReactSelect';
import { AsyncSelect } from '../components/form/AsyncSelect/AsyncSelect';

const opts = [
  { label: 'Select...', value: '' },
  { label: 'Value', value: 'value' },
];

const Components = () => (
  <div className="m-5">
    <span>Foo</span>
    <Card>
      <Formik
        onSubmit={console.log} // eslint-disable-line
        initialValues={{
          foo: '',
          bar: '',
          baz: '',
          baz1: '',
          baz2: '5deff27d2f687331c4637ff5',
        }}
        validate={(v) => {
          const e: any = {};
          if (!v.bar) e.bar = 'Missing';
          if (!v.foo) e.foo = 'Missing';
          if (!v.baz) e.baz = 'Missing';
          if (!v.baz1) e.baz1 = 'Missing';
          if (!v.baz2) e.baz2 = 'Missing';
          return e;
        }}
      >
        {() => (
          <Form>
            <Input name="bar" label="Bar" />
            <TextArea name="foo" label="Foo" />
            <Select name="baz" label="Baz" options={opts} />
            <ReactSelect name="baz1" label="Baz1" options={opts} />
            <AsyncSelect
              name="baz2"
              label="Async Select"
              searchFields={['name']}
              order="name ASC"
              getUrl="http://localhost:3001/api/Items"
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Card>
  </div>
);

export default Components;
