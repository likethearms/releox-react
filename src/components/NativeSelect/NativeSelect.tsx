import React from 'react';
import Select from 'react-select';
import {
  AbstractInputGroupProps,
  AbstractInputGroup,
} from '../AbstractInputGroup/AbstractInputGroup';

export interface SelectProps extends AbstractInputGroupProps {
  placeholder?: string;
  className?: string;
  options: any[];
  selectedOption: any;
  onChange(value: any): void;
}

export class NativeSelect extends AbstractInputGroup<SelectProps> {
  getElement(name: string, id: string): JSX.Element {
    const { placeholder, label, className, options, selectedOption, onChange } = this.props;
    return (
      <Select
        className={className}
        name={name}
        id={id || `${name}-input`}
        onChange={onChange}
        options={options}
        placeholder={placeholder || label}
        value={selectedOption || null}
      />
    );
  }
}
