/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { concatClassnames, css, renderChildren } from '@diegofrayo/styles';

import cssPropTypes from '../cssPropTypes';
import cssGenerator from '../cssGenerator';

const Heading = ({ children, is: Component, ...rest }) => {
  const className = css(cssGenerator(rest));

  return (
    <Component
      css={className}
      className={concatClassnames('dfr-heading', rest.className)}
    >
      {renderChildren(children)}
    </Component>
  );
};

Heading.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,

  is: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),

  ...cssPropTypes.color,
  ...cssPropTypes.fonts,
  ...cssPropTypes.spacing,
};

Heading.defaultProps = {
  is: 'h1',
};

export default Heading;
