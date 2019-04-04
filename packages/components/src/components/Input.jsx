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
  required: PropTypes.bool,

  ...cssPropTypes.layout,
};

Input.defaultProps = {
  className: '',
  htmlAttrs: {},
  id: '',
  required: false,
};

export default Input;
