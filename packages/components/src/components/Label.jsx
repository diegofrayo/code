/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { concatClassnames, renderChildren } from '@diegofrayo/styles';

const Label = ({ children, htmlFor, ...rest }) => {
  return (
    // eslint-disable-next-line
    <label className={concatClassnames('dfr-label', rest.className)} htmlFor={htmlFor}>
      {renderChildren(children)}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
  htmlFor: PropTypes.string.isRequired,
};

Label.defaultProps = {};

export default Label;
