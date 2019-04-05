import React, { Component } from 'react';
import Async from 'react-select/lib/Async';
import Axios from 'axios';
import PropTypes, { Requireable, Validator } from 'prop-types';
import {
  AsyncSelectInputState,
  AsyncSelectInputProps,
  AsyncSelectInputDefaultProps,
} from '../../typings';

interface AsyncSelectInputPropTypes {
  placeholder: Requireable<string>;
  onChange: Validator<NonNullable<(value: string | number | null) => void>>;
  getUrl: Validator<NonNullable<string>>;
  fixedValue: Requireable<string>;
  mapValue: Requireable<string>;
  mapLabel: Requireable<string>;
  value: Requireable<string>;
  searchFields: Validator<NonNullable<(string | null)[]>>;
}

class AsyncSelect extends Component<AsyncSelectInputProps, AsyncSelectInputState> {
  static propTypes: AsyncSelectInputPropTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    getUrl: PropTypes.string.isRequired,
    fixedValue: PropTypes.string,
    mapValue: PropTypes.string,
    mapLabel: PropTypes.string,
    value: PropTypes.string,
    searchFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps: AsyncSelectInputDefaultProps = {
    placeholder: undefined,
    value: undefined,
    fixedValue: undefined,
    onError: () => { },
    mapValue: 'id',
    mapLabel: 'name',
  };

  state: AsyncSelectInputState = {
    defaultValue: undefined,
    loading: false,
  };

  constructor(props: AsyncSelectInputProps) {
    super(props);
    this.state = {
      loading: true,
      defaultValue: undefined,
    };
  }

  componentWillMount(): void {
    const { value } = this.props;
    if (value) {
      this.setupDefaultValue();
    } else {
      this.setState({ loading: false });
    }
  }

  getAsyncSelectElement(): JSX.Element {
    const {
      onChange, placeholder, fixedValue,
    } = this.props;
    const { defaultValue } = this.state;
    const compProps: { value?: string; } = {};
    if (fixedValue) compProps.value = fixedValue;
    return (
      <Async
        {...compProps}
        cacheOptions
        placeholder={placeholder}
        defaultOptions
        isClearable
        loadOptions={this.loadOptions.bind(this)}
        onChange={(o: any) => onChange(o === null ? '' : o.value)}
        defaultValue={defaultValue}
      />
    );
  }

  setupDefaultValue(): Promise<void> {
    const {
      value, getUrl, mapValue, mapLabel,
    } = this.props;
    return Axios
      .get(getUrl, { params: { filter: { where: { [mapValue]: value } } } })
      .then(r => this.setState({
        defaultValue: {
          value: r.data[0][mapValue],
          label: r.data[0][mapLabel],
        },
        loading: false,
      }));
  }

  buildQuery(inputValue: string): { [key: string]: { like: string, options: string } } {
    const { searchFields } = this.props;
    return { [searchFields[0]]: { like: inputValue, options: 'i' } };
  }

  loadOptions(inputValue: string): Promise<{ value: string, label: string }[]> {
    const { getUrl, mapValue, mapLabel, onError } = this.props;
    return new Promise((resolve) => {
      Axios
        .get(getUrl, { params: { filter: { where: this.buildQuery(inputValue) }, limit: 10 } })
        .then(r => resolve(r.data.map((c: any) => ({ value: c[mapValue], label: c[mapLabel] }))))
        .catch(onError);
    });
  }

  render(): JSX.Element {
    const { loading } = this.state;
    if (loading) return <span id="loading" />;
    return this.getAsyncSelectElement();
  }
}

export default AsyncSelect;
