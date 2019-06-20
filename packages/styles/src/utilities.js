import React from 'react';
import { getTheme } from './theme';

export const keyMirror = (object = {}) => {
  return (Array.isArray(object) ? object : Object.keys(object)).reduce((result, curr) => {
    // eslint-disable-next-line no-param-reassign
    result[curr] = curr;

    return result;
  }, {});
};

export const arrayWithAliases = (object = {}, otherProps = {}) => {
  if (Array.isArray(object)) {
    return Object.keys(otherProps).reduce((result, curr) => {
      Object.defineProperty(result, curr, { value: otherProps[curr] });
      return result;
    }, object);
  }

  return Object.keys(object).reduce(
    (result, curr, index) => {
      // eslint-disable-next-line no-param-reassign
      result[index] = object[curr];

      Object.defineProperty(result, curr, { value: result[index] });

      return result;
    },
    Object.keys(otherProps).reduce((result, curr) => {
      Object.defineProperty(result, curr, { value: otherProps[curr] });
      return result;
    }, []),
  );
};

export const renderChildren = children => {
  return Array.isArray(children)
    ? React.Children.map(children, child => child)
    : children;
};

export const spacingX = (property, value) => {
  return `
    ${property}-left: ${value};
    ${property}-right: ${value};
  `;
};

export const spacingY = (property, value) => {
  return `
    ${property}-top: ${value};
    ${property}-bottom: ${value};
  `;
};

export const getUnits = (value, themeValues) => {
  let finalValue = value;

  if (Array.isArray(themeValues)) {
    finalValue = themeValues[value];

    if (finalValue === undefined) {
      return themeValues.default;
    }

    return finalValue;
  }

  if (typeof finalValue === 'number') {
    return `${finalValue}px`;
  }

  return finalValue;
};

export const utils = {
  if: (condition, result, resultFalse) => {
    if (typeof result === 'object') {
      return condition ? result.true : result.false;
    }

    return condition ? result : resultFalse;
  },

  ifProp: (condition, property, value) => {
    if (condition) {
      return `${property}: ${value};`;
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

  marginX: value => spacingX('margin', getUnits(value, getTheme().spacing)),
  marginY: value => spacingY('margin', getUnits(value, getTheme().spacing)),
  paddingX: value => spacingX('padding', getUnits(value, getTheme().spacing)),
  paddingY: value => spacingY('padding', getUnits(value, getTheme().spacing)),
};
