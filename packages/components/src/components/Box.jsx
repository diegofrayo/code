/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { css, concatClassnames, renderChildren } from '@diegofrayo/styles';

import cssGenerator from '../cssGenerator';

const classes = {
  row: css(`flex-direction: row;`),
  column: css(`flex-direction: column;`),
};

const createCustomPropsClassName = props => {
  return Object.keys(props).reduce((acum, curr) => {
    const cssClass = classes[curr];
    if (cssClass) acum.push(cssClass);
    return acum;
  }, []);
};

const Box = ({ children, is: Component, ...rest }) => {
  const cssPropsClassName = css(cssGenerator(rest));
  const customPropsClassNames = createCustomPropsClassName(rest);

  return (
    <Component
      css={[cssPropsClassName, ...customPropsClassNames]}
      className={concatClassnames('dfr-box', rest.className)}
    >
      {renderChildren(children)}
    </Component>
  );
};

Box.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,

  is: PropTypes.oneOf(['div', 'section', 'article', 'main', 'modal', 'header']),
};

Box.defaultProps = {
  is: 'section',
};

export default Box;
