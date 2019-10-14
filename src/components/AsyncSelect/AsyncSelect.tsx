import React from 'react';
import Async from 'react-select/async';
import { Field } from 'formik';
import Axios from 'axios';
import { AbstractFormikInputGroup } from '../AbstractInputGroup/AbstractFormikInputGroup';
import { ct } from '../../I18N';

export interface AsyncSelectInputDefaultProps {
  onError?: (e: Error) => any;
  onChange?: () => void;
  placeholder: undefined;
  value: undefined;
  queryFormat: AsyncSelectQueryFormat;
  mapValue: string;
  mapLabel: string;
}

export type AsyncSelectQueryFormat = 'mongodb' | 'postgresql';

export interface AsyncSelectInputProps {
  searchFields: string[];
  getUrl: string;
  name: string;
  label: string;
  onChange?(value: string | number | null): void;
  onError?(e: Error): any;
  queryFormat?: AsyncSelectQueryFormat;
  className?: string;
  id?: string;
  value?: string;
  mapValue?: string;
  mapLabel?: string;
}

export interface AsyncSelectInputState {
  defaultValue: any;
  isUnmounted: boolean;
  loading: boolean;
}

const defaultProps = {
  mapValue: 'id',
  queryFormat: 'mongodb',
  mapLabel: 'name',
};

interface ExtendedProps extends AsyncSelectInputProps {
  form: any;
  field: any;
}

export class AsyncSelectElement extends AbstractFormikInputGroup<
  ExtendedProps,
  AsyncSelectInputState
> {
  constructor(props: any) {
    super(props);
    this.loadOptions = this.loadOptions.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isUnmounted: false,
      loading: true,
      defaultValue: undefined,
    };
  }

  componentDidMount(): void {
    const { field } = this.props;
    if (field.value) {
      this.setupDefaultValue();
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    this.setState({});
  }

  onChange(o: any) {
    const { field, form } = this.props;
    form.setFieldValue(field.name, o === null ? '' : o.value);
  }

  setupDefaultValue(): Promise<void> {
    const { field, getUrl, mapValue, mapLabel } = this.props;
    const mapV = mapValue || defaultProps.mapValue;
    const mapL = mapLabel || defaultProps.mapLabel;
    return Axios.get(getUrl, { params: { filter: { where: { [mapV]: field.value } } } }).then(
      (r) => {
        const { isUnmounted } = this.state;
        if (isUnmounted) return Promise.resolve();
        return this.setState({
          defaultValue: {
            value: r.data[0][mapV],
            label: r.data[0][mapL],
          },
          loading: false,
        });
      }
    );
  }

  buildQuery(inputValue: string): { [key: string]: { ilike: string } } {
    const { searchFields, queryFormat } = this.props;
    const qf = queryFormat || defaultProps.queryFormat;
    let query: any;
    if (qf === 'postgresql') {
      query = { ilike: `%${inputValue}%` };
    } else {
      query = { like: inputValue, options: 'i' };
    }
    return { [searchFields[0]]: query };
  }

  loadOptions(inputValue: string): Promise<{ value: string; label: string }[]> {
    const { getUrl, mapValue, mapLabel, onError } = this.props;
    const mapV = mapValue || defaultProps.mapValue;
    const mapL = mapLabel || defaultProps.mapLabel;
    return new Promise((resolve, reject) => {
      Axios.get(getUrl, { params: { filter: { where: this.buildQuery(inputValue) }, limit: 10 } })
        .then((r) => resolve(r.data.map((c: any) => ({ value: c[mapV], label: c[mapL] }))))
        .catch((e) => {
          if (onError) onError(e);
          reject(e);
        });
    });
  }

  getElement(): JSX.Element {
    const { className, id, field, form } = this.props;
    const { defaultValue, loading } = this.state;
    const t = ct('asyncSelect');
    if (loading) return <p>{t('loading')}</p>;
    return (
      <div className="ReactSelectHelper">
        <Async
          cacheOptions
          placeholder={t('placeholder')}
          className={`${className || ''} ${this.getInvalidClass({ field, form })}`}
          id={id}
          classNamePrefix="AsynSelect"
          defaultOptions
          isClearable
          onBlur={() => form.setFieldTouched(field.name, true)}
          loadOptions={this.loadOptions}
          onChange={this.onChange}
          defaultValue={defaultValue}
        />
        {this.getErrorMessageField(field.name)}
      </div>
    );
  }
}

export const AsyncSelect = (props: AsyncSelectInputProps) => (
  // eslint-disable-next-line
  <Field component={AsyncSelectElement} {...props} />
);
