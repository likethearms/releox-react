import React, { FormEvent } from 'react';
import {
  AbstractInputGroupProps,
  AbstractInputGroup,
} from '../AbstractInputGroup/AbstractInputGroup';

export interface NativeTextAreaProps extends AbstractInputGroupProps {
  rows?: number;
  placeholder?: string;
  className?: string;
  value?: string | string[] | undefined;
  onChange?(e: FormEvent<HTMLTextAreaElement>): void;
}

export class NativeTextArea extends AbstractInputGroup<NativeTextAreaProps> {
  getElement(name: string, id: string): JSX.Element {
    const { rows, placeholder, label, className, value, onChange } = this.props;
    return (
      <textarea
        name={name}
        id={id || `${name}-input`}
        rows={rows || 6}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className={className || 'form-control'}
      />
    );
  }
}
