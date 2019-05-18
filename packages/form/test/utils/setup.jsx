import React from 'react';
import { render } from 'react-testing-library';

const App = ({ children }) => {
  return <main>{children}</main>;
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: App, ...options });
};

const sleep = tm => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1000 * tm);
  });
};

jest.setTimeout(10000);

export * from 'react-testing-library';

export { customRender as render, sleep };
