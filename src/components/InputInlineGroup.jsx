import React from 'react';
import PropTypes from 'prop-types';

const InputInlineGroup = (props) => {
  const {
    value, name, type, label, onChange, placeholder,
  } = props;
  return (
    <div className="input-group my-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          {label.includes('fa-') ? (
            <i className={label} />
          ) : label}
        </span>
      </div>
      <input
        type={type}
        className="form-control"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

InputInlineGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

InputInlineGroup.defaultProps = {
  name: '',
  type: 'text',
  placeholder: '',
};

export default InputInlineGroup;
