import getValue from 'get-value';
import React from 'react';
import { DetailField } from './DetailField';

export interface DetailsFieldData {
  text: string;
  dataField: string;
  formatter?(value: any, object: any): string | JSX.Element;
}

export interface DetailsProps {
  object: any;
  properties: DetailsFieldData[];
}

export const Details = ({ object, properties }: DetailsProps) => (
  <table className="Details">
    <tbody>
      {properties.map((prop) => (
        <DetailField key={prop.dataField} label={prop.text}>
          {prop.formatter
            ? prop.formatter(getValue(object, prop.dataField), object)
            : getValue(object, prop.dataField)}
        </DetailField>
      ))}
    </tbody>
  </table>
);
