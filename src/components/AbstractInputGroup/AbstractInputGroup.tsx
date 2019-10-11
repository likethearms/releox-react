/*
 * This component should be use to make inputs for Releox framework. It add default
 * styling to every input and make it to easy add features to all inputs
 * if you planning to make Formik input, i recommend to you to use AbstractFormikInputGroup.
 */
import React, { Component } from 'react';

export interface AbstractInputGroupProps {
  label: string;
  name: string;
  id?: string;
  inline?: boolean;
  inlineLabelWidth?: number;
  labelClass?: string;
}

export abstract class AbstractInputGroup<T, S = {}> extends Component<
  T & AbstractInputGroupProps,
  S
> {
  abstract getElement(name: string, id?: string): JSX.Element;

  render(): JSX.Element {
    const { id, label, name, inline, inlineLabelWidth, labelClass } = this.props;
    let inlineWidth = 4;
    if (typeof inlineLabelWidth === 'number') inlineWidth = inlineLabelWidth;
    const inputWidth = 12 - inlineWidth;
    return (
      <div className={`form-group ${inline ? 'row' : ''}`}>
        <label
          htmlFor={id || `${name}-input`}
          className={`${labelClass || ''} ${inline ? `col-md-${inlineWidth} col-form-label` : ''}`}
        >
          {label}
        </label>
        <div className={inline ? `col-md-${inputWidth}` : ''}>{this.getElement(name, id)}</div>
      </div>
    );
  }
}
