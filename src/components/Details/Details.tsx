import React from 'react';
import { DetailField } from './DetailField';

interface DetailsFieldData {
  label: string;
  key: string;
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
          {object[prop.key]}
        </DetailField>
      ))}
    </tbody>
  </table>
);
