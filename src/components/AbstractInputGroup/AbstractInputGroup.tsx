import React, { Component } from 'react';

export interface AbstractInputGroupProps {
  label: string;
  name: string;
  id?: string;
  inline?: boolean;
  inlineLabelWidth?: number;
  labelClass?: string;
}

export abstract class AbstractInputGroup<T> extends Component<T & AbstractInputGroupProps> {
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
