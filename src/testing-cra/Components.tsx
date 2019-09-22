import React from 'react';
import { Formik, Form } from 'formik';
import { Card } from '../components/Card/Card';
import { AsyncSelectFormik } from '../components/AsyncSelect/AsyncSelectFormik';

const Components = () => (
  <div className="m-5">
    <span>Foo</span>
    <Card>
      <Formik
        onSubmit={() => {}}
        initialValues={{ name: '' }}
        validate={(v) => {
          const e: any = {};
          if (!v.name) e.name = 'Missing';
          return e;
        }}
      >
        {() => (
          <Form>
            <button type="submit">Submit</button>
            <AsyncSelectFormik
              getUrl="http://localhost:3001/api/Vehicles"
              queryFormat="mongodb"
              label="Products"
              mapLabel="registerNumber"
              searchFields={['registerNumber']}
              name="name"
            />
          </Form>
        )}
      </Formik>
    </Card>
  </div>
);

export default Components;
