import { spacingX, getUnits, spacingY } from '@diegofrayo/styles';

import theme from './theme';

const cssConstructor = {
  bg: value => {
    if (value === undefined) return '';
    return `background-color: ${value};`;
  },
  color: value => {
    if (value === undefined) return '';
    return `color: ${value};`;
  },
  fontSize: value => {
    if (value === undefined) return '';
    return `font-size: ${getUnits(value, theme.fontSize)};`;
  },
  fontWeight: value => {
    if (value === undefined) return '';
    return `font-weight: ${value};`;
  },
  margin: value => {
    if (value === undefined) return '';
    return `margin: ${getUnits(value, theme.spacing)};`;
  },
  marginTop: value => {
    if (value === undefined) return '';
    return `margin-top: ${getUnits(value, theme.spacing)};`;
  },
  marginRight: value => {
    if (value === undefined) return '';
    return `margin-right: ${getUnits(value, theme.spacing)};`;
  },
  marginBottom: value => {
    if (value === undefined) return '';
    return `margin-bottom: ${getUnits(value, theme.spacing)};`;
  },
  marginLeft: value => {
    if (value === undefined) return '';
    return `margin-left: ${getUnits(value, theme.spacing)};`;
  },
  marginX: value => {
    if (value === undefined) return '';
    return spacingX(getUnits(value, theme.spacing));
  },
  marginY: value => {
    if (value === undefined) return '';
    return spacingY(getUnits(value, theme.spacing));
  },
  padding: value => {
    if (value === undefined) return '';
    return `padding: ${getUnits(value, theme.spacing)};`;
  },
  paddingTop: value => {
    if (value === undefined) return '';
    return `padding-top: ${getUnits(value, theme.spacing)};`;
  },
  paddingRight: value => {
    if (value === undefined) return '';
    return `padding-right: ${getUnits(value, theme.spacing)};`;
  },
  paddingBottom: value => {
    if (value === undefined) return '';
    return `padding-bottom: ${getUnits(value, theme.spacing)};`;
  },
  paddingLeft: value => {
    if (value === undefined) return '';
    return `padding-left: ${getUnits(value, theme.spacing)};`;
  },
  paddingX: value => {
    if (value === undefined) return '';
    return spacingX(getUnits(value, theme.spacing));
  },
  paddingY: value => {
    if (value === undefined) return '';
    return spacingY(getUnits(value, theme.spacing));
  },
};

const cssGenerator = props => {
  return Object.keys(props).reduce((acum, curr) => {
    let style = '';

    if (typeof cssConstructor[curr] === 'function') {
      style = cssConstructor[curr](props[curr]);
    }

    return acum + style;
  }, '');
};

export default cssGenerator;
