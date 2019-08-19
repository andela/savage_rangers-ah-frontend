import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
  placeholder, inputMode, onChange, autoComplete, required, type
}) => (
  <input
    className="form-control common-form-input"
    inputMode={inputMode}
    placeholder={placeholder}
    onChange={onChange}
    autoComplete={autoComplete}
    required={required}
    type={type}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string,
  inputMode: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string
};

Input.defaultProps = {
  placeholder: '',
  inputMode: 'text',
  autoComplete: 'text',
  required: false,
  type: 'text'
};

export default Input;
