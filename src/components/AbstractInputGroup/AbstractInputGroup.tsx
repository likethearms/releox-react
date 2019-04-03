import React, { Component } from 'react';
import { AbstractInputGroupProps } from '../../typings';

abstract class AbstractInputGroup<T> extends Component<T & AbstractInputGroupProps> {
  abstract getElement(name: string, id: string): JSX.Element;

  render(): JSX.Element {
    const { id, label, name } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={id}>{label}</label>
        {this.getElement(name, id)}
      </div>
    );
  }
}

export default AbstractInputGroup;
