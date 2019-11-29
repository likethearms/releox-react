import React from 'react';
import getValue from 'get-value';
import { DetailField } from './DetailField';

interface DetailsFieldData {
  label: string;
  key: string;
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
        <DetailField key={prop.key} label={prop.label}>
          {prop.formatter
            ? prop.formatter(getValue(object, prop.key), object)
            : getValue(object, prop.key)}
        </DetailField>
      ))}
    </tbody>
  </table>
);
