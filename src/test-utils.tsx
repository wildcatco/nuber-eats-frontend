import { render, RenderOptions } from '@testing-library/react';
import React, { FC, ReactElement } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HelmetProvider>
      <Router>{children}</Router>
    </HelmetProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
