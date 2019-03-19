import React, { Component } from 'react';

export interface AbstractInputGroupProps {
  label: string;
  name: string;
  id: string;
}

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
