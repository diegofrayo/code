// eslint-disable-next-line
export const keyMirror = object => {
  return Object.keys(object).reduce((result, key) => {
    result[key] = key; // eslint-disable-line
    return result;
  }, {});
};
