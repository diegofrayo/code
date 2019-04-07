/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { concatClassnames, css } from '@diegofrayo/styles';

import cssPropTypes from '../cssPropTypes';
import cssGenerator from '../cssGenerator';

const Input = ({
  id,
  name,
  required,
  value,
  onChange,
  onBlur,
  className,
  htmlAttrs,
  ...rest
}) => {
  const cssClassName = css(cssGenerator(rest));

  return (
    <input
      id={id || `${name}-id`}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={concatClassnames('dfr-input', className)}
      css={cssClassName}
      {...htmlAttrs}
    />
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    .isRequired,

  className: PropTypes.string,
  htmlAttrs: PropTypes.object,
  id: PropTypes.string,
  onBlur: PropTypes.func,
  required: PropTypes.bool,

  ...cssPropTypes.layout,
};

Input.defaultProps = {
  className: '',
  htmlAttrs: {},
  id: '',
  onBlur: undefined,
  required: false,
};

export default Input;
