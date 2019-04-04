import classnames from 'classnames';
import emotionStyled from '@emotion/styled';
import { css as emotionCSS } from '@emotion/core';

import { getTheme } from './theme';
import { spacingX, getUnits, spacingY } from './utilities';

export const utilities = {
  if: (exp, resTrue, resFalse) => {
    if (typeof resTrue === 'object') {
      return exp ? resTrue.true : resTrue.false;
    }

    return exp ? resTrue : resFalse;
  },
  ifProp: (exp, property, res) => {
    if (exp) {
      return `${property}: ${res};`;
    }

    return '';
  },
  switch: (prop, values) => {
    const value = values[prop];

    if (value === undefined && values.default !== undefined) {
      return values.default;
    }

    return value;
  },
  switchProp: (prop, cssProp, values) => {
    const value = values[prop];
    return value !== undefined ? `${cssProp}: ${value}` : '';
  },
  marginX: value => spacingX('margin', getUnits(value, getTheme().margin)),
  marginY: value => spacingY('margin', getUnits(value, getTheme().margin)),
  paddingX: value => spacingX('padding', getUnits(value, getTheme().padding)),
  paddingY: value => spacingY('padding', getUnits(value, getTheme().padding)),
};

export const css = param => {
  return typeof param === 'function'
    ? emotionCSS(param({ theme: getTheme(), utilities }))
    : emotionCSS(param);
};

export const styled = tagName => fn => {
  return emotionStyled(tagName)(props => {
    return typeof fn === 'function' ? fn({ props, theme: getTheme(), utilities }) : fn;
  });
};

export const createStyles = fn => {
  return fn(getTheme());
};

export const injectGlobal = styles => {
  let cssStyles = typeof styles === 'function' ? styles(getTheme()) : styles;
  cssStyles = cssStyles.replace(/\n/g, '').replace(/ /g, '');

  const styleObject = document.createElement('style');
  styleObject.innerText = cssStyles;
  styleObject.setAttribute('data-source', '@diegofrayo/styles');

  document.getElementsByTagName('head')[0].appendChild(styleObject);
};

export const concatClassnames = (...rest) => {
  return classnames(...rest);
};
