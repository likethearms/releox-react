import React, { useState, useEffect } from 'react';
import Async from 'react-select/async';
import { Field, FieldInputProps, FormikProps, FieldMetaProps } from 'formik';
import Axios from 'axios';
import { useTranslation } from 'react-i18next';
import { BaseInput, AbstractBaseInputProps } from '../BaseInput/BaseInput';

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

export interface AsyncSelectInputProps extends AbstractBaseInputProps {
  searchFields: string[];
  getUrl: string;
  onChange?(value: string | number | null): void;
  onError?(e: Error): any;
  queryFormat?: AsyncSelectQueryFormat;
  order?: string;
  value?: string;
  query?: any;
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
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  meta: FieldMetaProps<any>;
}

export const AsyncSelectElement = (props: ExtendedProps) => {
  const { field } = props;
  const [isUnmounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultValue, setDefaultValue] = useState<{ value: string; label: string } | undefined>(
    undefined
  );

  const setupDefaultValue = (): Promise<void> => {
    const { getUrl, mapValue, mapLabel } = props;
    const mapV = mapValue || defaultProps.mapValue;
    const mapL = mapLabel || defaultProps.mapLabel;
    return Axios.get(getUrl, { params: { filter: { where: { [mapV]: field.value } } } }).then(
      (r) => {
        if (!isUnmounted) {
          setDefaultValue({
            value: r.data[0][mapV],
            label: r.data[0][mapL],
          });
          setIsLoading(false);
        }
      }
    );
  };

  useEffect(() => {
    if (field.value) setupDefaultValue();
    else setIsLoading(false);
    // eslint-disable-next-line
  }, []);

  const onChange = (o: any) => {
    const { form } = props;
    form.setFieldValue(field.name, o === null ? '' : o.value);
  };

  const buildQuery = (inputValue: string): { [key: string]: { ilike: string } } => {
    const { searchFields, queryFormat, query } = props;
    const qf = queryFormat || defaultProps.queryFormat;
    let inputQuery: any;
    if (qf === 'postgresql') {
      inputQuery = { ilike: `%${inputValue}%` };
    } else {
      inputQuery = { like: inputValue, options: 'i' };
    }
    if (query) {
      inputQuery = { and: [query, { [searchFields[0]]: inputQuery }] };
    }
    return inputQuery;
  };

  const loadOptions = (inputValue: string): Promise<{ value: string; label: string }[]> => {
    const { getUrl, mapValue, mapLabel, onError, order } = props;
    const mapV = mapValue || defaultProps.mapValue;
    const mapL = mapLabel || defaultProps.mapLabel;
    return new Promise((resolve, reject) => {
      Axios.get(getUrl, {
        params: { filter: { where: buildQuery(inputValue), order }, limit: 10 },
      })
        .then((r) => resolve(r.data.map((c: any) => ({ value: c[mapV], label: c[mapL] }))))
        .catch((e) => {
          if (onError) onError(e);
          reject(e);
        });
    });
  };

  const { form, className } = props;
  const { t } = useTranslation('AsyncSelect');
  if (isLoading) return <p>{t('loading')}</p>;
  return (
    // eslint-disable-next-line
    <BaseInput {...props} name={props.field.name}>
      {({ getInvalidClass, getErrorMessageField, getId, getPlaceholder }) => (
        <div className="ReactSelectHelper">
          <Async
            cacheOptions
            placeholder={getPlaceholder()}
            className={`${className || ''} ${getInvalidClass(props)}`}
            id={getId()}
            classNamePrefix="AsynSelect"
            defaultOptions
            isClearable
            onBlur={() => form.setFieldTouched(field.name, true)}
            loadOptions={loadOptions}
            onChange={onChange}
            defaultValue={defaultValue}
          />
          {getErrorMessageField()}
        </div>
      )}
    </BaseInput>
  );
};

export const AsyncSelect = (props: AsyncSelectInputProps) => (
  // eslint-disable-next-line
  <Field component={AsyncSelectElement} {...props} />
);
