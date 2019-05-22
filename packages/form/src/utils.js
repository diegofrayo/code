import React from 'react';

export const keyMirror = object => {
  return Object.keys(object).reduce((result, key) => {
    result[key] = key; // eslint-disable-line
    return result;
  }, {});
};

export const didMount = callback => {
  return React.useEffect(callback, []);
};
