import React from 'react';

export interface DetailFieldProps {
  label: string;
  children?: string | number;
}

export const DetailField = ({ label, children }: DetailFieldProps) => {
  return (
    <tr className="DetailField">
      <td className="DetailField-key">
        <strong>{label}</strong>
      </td>
      <td className="DetailField-value">{children || '-'}</td>
    </tr>
  );
};
