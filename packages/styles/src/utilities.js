import React from 'react';

export const keyMirror = object => {
  return Object.keys(object).reduce((acum, curr) => {
    acum[curr] = curr; // eslint-disable-line
    return acum;
  }, {});
};

export const arrayWithAliases = (object, otherProps) => {
  if (Array.isArray(object)) {
    return Object.keys(otherProps).reduce((acum, curr) => {
      acum[curr] = otherProps[curr]; // eslint-disable-line
      return acum;
    }, object);
  }

  return Object.keys(object).reduce(
    (acum, curr, index) => {
      acum[index] = object[curr]; // eslint-disable-line
      acum[curr] = acum[index]; // eslint-disable-line
      return acum;
    },
    Object.keys(otherProps).reduce((acum, curr) => {
      acum[curr] = otherProps[curr]; // eslint-disable-line
      return acum;
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
  if (typeof value === 'string') {
    return value;
  }

  if (!Array.isArray(themeValues)) {
    return `${value}px`;
  }

  const finalValue = themeValues[value];

  if (finalValue === undefined) {
    return themeValues.default;
  }

  if (typeof finalValue === 'number') {
    return `${finalValue}px`;
  }

  return finalValue;
};
