/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { concatClassnames } from '@diegofrayo/styles';

const Input = ({ id, name, required, type, value, onChange, className, ...rest }) => {
  return (
    <input
      id={id || `${name}-id`}
      name={name}
      required={required}
      type={type}
      value={value}
      onChange={onChange}
      className={concatClassnames('dfr-input', className)}
      {...rest}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    .isRequired,

  className: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  className: '',
  id: '',
  required: false,
};

export default Input;
