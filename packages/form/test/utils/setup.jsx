import React from 'react';
import { render } from 'react-testing-library';

const App = ({ children }) => {
  return <main>{children}</main>;
};

const customRender = (ui, options) => {
  return render(ui, { wrapper: App, ...options });
};

export * from 'react-testing-library';

export { customRender as render };
