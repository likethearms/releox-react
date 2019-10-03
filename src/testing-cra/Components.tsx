import React from 'react';
import { Formik, Form } from 'formik';
import { Card } from '../components/Card/Card';
import { ReactSelect } from '../components/ReactSelect/ReactSelect';

const Components = () => (
  <div className="m-5">
    <span>Foo</span>
    <Card>
      <Formik
        onSubmit={(x) => x}
        initialValues={{
          reactSelect: 'foo',
          selectReact: '',
        }}
        validate={(v) => {
          const e: any = {};
          if (!v.selectReact) e.selectReact = 'Missing';
          return e;
        }}
      >
        {() => (
          <Form>
            <button type="submit">Submit</button>
            <ReactSelect
              options={[{ label: 'Foo', value: 'foo' }, { label: 'Bar', value: 'bar' }]}
              label="ReactSelect"
              name="reactSelect"
            />
            <ReactSelect
              options={[{ label: 'Hello', value: 'hello' }, { label: 'Bye', value: 'bye' }]}
              label="SelectReact"
              name="selectReact"
            />
          </Form>
        )}
      </Formik>
    </Card>
  </div>
);

export default Components;
