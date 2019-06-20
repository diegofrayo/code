import classnames from 'classnames';
import emotionStyled from '@emotion/styled';
import { css as emotionCSS } from '@emotion/core';

import { getTheme } from './theme';
import { utils } from './utilities';

export const css = param => {
  return typeof param === 'function'
    ? emotionCSS(param({ theme: getTheme(), utils }))
    : emotionCSS(param);
};

export const styled = tagName => fn => {
  return emotionStyled(tagName)(props => {
    return typeof fn === 'function' ? fn({ props, theme: getTheme(), utils }) : fn;
  });
};

export const createStyles = fn => {
  return fn({ theme: getTheme(), utils });
};

export const injectGlobal = styles => {
  let cssStyles =
    typeof styles === 'function' ? styles({ theme: getTheme(), utils }) : styles;
  cssStyles = cssStyles.replace(/\n/g, '').replace(/ /g, '');

  const styleObject = document.createElement('style');
  styleObject.innerText = cssStyles;
  styleObject.setAttribute('data-source', '@diegofrayo/styles');

  document.getElementsByTagName('head')[0].appendChild(styleObject);
};

export const concatClassnames = (...rest) => {
  return classnames(...rest);
};
