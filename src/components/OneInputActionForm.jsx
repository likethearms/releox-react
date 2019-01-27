import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputInlineGroup from './InputInlineGroup';

const OneInputActionForm = (props) => {
  const {
    onSubmit, title, subTitle, value, label, placeholder,
    type, name, onChange, backUrl, backText, message, buttonText,
  } = props;
  return (
    <form onSubmit={onSubmit}>
      <h1>{title}</h1>
      <p className="text-muted">{subTitle}</p>
      <InputInlineGroup
        value={value}
        label={label}
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={onChange}
      />
      <div className="row">
        <div className="col-6">
          {backUrl ? (
            <NavLink className="btn btn-link px-0" to={backUrl}>{backText}</NavLink>
          ) : undefined}
        </div>
        <div className="col-6 text-right">
          <button type="submit" className="btn btn-primary px-4">{buttonText}</button>
        </div>
      </div>
      {message ? (
        <div className="row">
          <div className="col-md-12">
            <p className="text-muted text-center mt-4">{message}</p>
          </div>
        </div>
      ) : undefined}
    </form>
  );
};

OneInputActionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  backUrl: PropTypes.string,
  backText: PropTypes.string,
  message: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
};


OneInputActionForm.defaultProps = {
  type: 'text',
  backUrl: undefined,
  backText: undefined,
  message: undefined,
};

export default OneInputActionForm;
