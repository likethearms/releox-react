import React, { FormEvent } from 'react';
import {
  AbstractInputGroupProps,
  AbstractInputGroup,
} from '../AbstractInputGroup/AbstractInputGroup';
import { InputTypes } from './Input';

export interface NativeInputProps extends AbstractInputGroupProps {
  type?: InputTypes;
  placeholder?: string;
  className?: string;
  value?: string | number;
  onChange?(e: FormEvent<HTMLInputElement>): void;
}

export class NativeInput extends AbstractInputGroup<NativeInputProps> {
  getElement(name: string, id: string): JSX.Element {
    const { type, placeholder, label, className, onChange, value } = this.props;
    return (
      <input
        name={name}
        id={id || `${name}-input`}
        type={type || 'text'}
        placeholder={placeholder || label}
        className={className || 'form-control'}
        onChange={onChange}
        value={value}
      />
    );
  }
}
