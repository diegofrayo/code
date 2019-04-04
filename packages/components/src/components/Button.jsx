/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { concatClassnames, renderChildren } from '@diegofrayo/styles';

const Button = ({ children, type, onClick, ...rest }) => {
  return (
    // eslint-disable-next-line
    <button
      className={concatClassnames('dfr-button', rest.className)}
      type={type}
      onClick={onClick}
    >
      {renderChildren(children)}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,

  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
