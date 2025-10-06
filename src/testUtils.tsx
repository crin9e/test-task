/* eslint-disable react-refresh/only-export-components */
import { render, screen } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import '@testing-library/jest-dom';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
});

const mockLink = ({
  children,
  to,
  className,
  ...props
}: {
  children: ReactNode;
  to: string;
  className?: string;
  'data-testid'?: string;
}) => (
  <a href={to} className={className} data-testid={`link-${to}`} {...props}>
    {children}
  </a>
);

export * from '@testing-library/react';
export { customRender as render, screen, mockScrollTo, mockLink };
