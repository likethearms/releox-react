import React from 'react';
import { Formik, Form } from 'formik';
import { Card } from '../components/Card/Card';
import { Input } from '../components/Input/Input';
import { AsyncSelect } from '../components/AsyncSelect/AsyncSelect';

const Components = () => (
  <div className="m-5">
    <span>Foo</span>
    <Card>
      <Formik
        onSubmit={(x) => console.log(x)} // eslint-disable-line
        initialValues={{
          foo: '',
          bar: '',
        }}
        validate={(v) => {
          const e: any = {};
          if (!v.foo) e.foo = 'Missing';
          if (!v.bar) e.bar = 'Missing';
          return e;
        }}
      >
        {() => (
          <Form>
            <AsyncSelect
              name="foo"
              getUrl="http://localhost:3001/api/Lists"
              searchFields={['title']}
              label="Foo"
              mapLabel="title"
            />
            <Input name="bar" label="Foo" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </Card>
  </div>
);

export default Components;
