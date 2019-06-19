import React from 'react';

export const keyMirror = (object = {}) => {
  return (Array.isArray(object) ? object : Object.keys(object)).reduce((acum, curr) => {
    // eslint-disable-next-line no-param-reassign
    acum[curr] = curr;
    return acum;
  }, {});
};

export const componentDidMount = callback => {
  return React.useEffect(callback, []);
};

export const mergeActions = ({ actionTypes, reducer }) => {
  return actionTypes.reduce((result, actionType) => {
    // eslint-disable-next-line no-param-reassign
    result[actionType] = reducer;
    return result;
  }, {});
};
