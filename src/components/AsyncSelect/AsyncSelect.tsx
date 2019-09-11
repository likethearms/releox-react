import React, { Component } from 'react';
import Async from 'react-select/async';
import Axios from 'axios';
import PropTypes, { Requireable, Validator } from 'prop-types';

export interface AsyncSelectInputDefaultProps {
  onError?: (e: Error) => any;
  placeholder: undefined;
  value: undefined;
  mapValue: string;
  mapLabel: string;
}

export type AsyncSelectQueryFormat = 'mongodb' | 'postgresql';

export interface AsyncSelectInputProps {
  onChange(value: string | number | null): void;
  onError?(e: Error): any;
  queryFormat: AsyncSelectQueryFormat;
  placeholder?: string;
  value?: string;
  getUrl: string;
  mapValue: string;
  mapLabel: string;
  searchFields: string[];
}

export interface AsyncSelectInputState {
  defaultValue: any;
  loading: boolean;
}

interface AsyncSelectInputPropTypes {
  placeholder: Requireable<string>;
  onChange: Validator<NonNullable<(value: string | number | null) => void>>;
  getUrl: Validator<NonNullable<string>>;
  mapValue: Requireable<string>;
  onError: Requireable<Function>;
  mapLabel: Requireable<string>;
  value: Requireable<string>;
  searchFields: Validator<NonNullable<(string | undefined | null)[]>>;
}

export class AsyncSelect extends Component<AsyncSelectInputProps, AsyncSelectInputState> {
  static propTypes: AsyncSelectInputPropTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    getUrl: PropTypes.string.isRequired,
    onError: PropTypes.func,
    mapValue: PropTypes.string,
    mapLabel: PropTypes.string,
    value: PropTypes.string,
    searchFields: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps: AsyncSelectInputDefaultProps = {
    placeholder: undefined,
    value: undefined,
    onError: undefined,
    mapValue: 'id',
    mapLabel: 'name',
  };

  constructor(props: AsyncSelectInputProps) {
    super(props);
    this.loadOptions = this.loadOptions.bind(this);
    this.state = {
      loading: true,
      defaultValue: undefined,
    };
  }

  componentDidMount(): void {
    const { value } = this.props;
    if (value) {
      this.setupDefaultValue();
    } else {
      this.setState({ loading: false });
    }
  }

  getAsyncSelectElement(): JSX.Element {
    const {
      onChange, placeholder,
    } = this.props;
    const { defaultValue } = this.state;
    return (
      <Async
        cacheOptions
        placeholder={placeholder}
        defaultOptions
        isClearable
        loadOptions={this.loadOptions}
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
      .then((r) => this.setState({
        defaultValue: {
          value: r.data[0][mapValue],
          label: r.data[0][mapLabel],
        },
        loading: false,
      }));
  }

  buildQuery(inputValue: string): { [key: string]: { ilike: string } } {
    const { searchFields, queryFormat } = this.props;
    let query: any;
    if (queryFormat === 'postgresql') {
      query = { ilike: `%${inputValue}%` };
    } else {
      query = { like: inputValue, options: 'i' };
    }
    return { [searchFields[0]]: query };
  }

  loadOptions(inputValue: string): Promise<{ value: string, label: string }[]> {
    const {
      getUrl, mapValue, mapLabel, onError,
    } = this.props;
    return new Promise((resolve, reject) => {
      Axios
        .get(getUrl, { params: { filter: { where: this.buildQuery(inputValue) }, limit: 10 } })
        .then((r) => resolve(r.data.map((c: any) => ({ value: c[mapValue], label: c[mapLabel] }))))
        .catch((e) => {
          if (onError) onError(e);
          reject(e);
        });
    });
  }

  render(): JSX.Element {
    const { loading } = this.state;
    if (loading) return <span id="loading" />;
    return this.getAsyncSelectElement();
  }
}
