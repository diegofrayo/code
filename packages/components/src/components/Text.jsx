/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { concatClassnames, css, renderChildren } from '@diegofrayo/styles';

import cssPropTypes from '../cssPropTypes';
import cssGenerator from '../cssGenerator';

const Text = ({ children, ...rest }) => {
  const className = css(cssGenerator(rest));

  return (
    <p css={className} className={concatClassnames('dfr-text', rest.className)}>
      {renderChildren(children)}
    </p>
  );
};

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,

  ...cssPropTypes.color,
  ...cssPropTypes.fonts,
  ...cssPropTypes.spacing,
};

Text.defaultProps = {};

export default Text;
