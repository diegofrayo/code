/** @jsx jsx */
import { jsx } from '@emotion/core';
import { concatClassnames } from '@diegofrayo/styles';

const Loader = ({ ...rest }) => {
  return (
    <img
      className={concatClassnames('dfr-loader', rest.className)}
      src={require('./loader.svg')} // eslint-disable-line
      alt="Loading..."
    />
  );
};

export default Loader;
