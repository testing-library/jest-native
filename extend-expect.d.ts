import type { ReactTestInstance } from 'react-test-renderer';

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      toBeDisabled(): R;
      toContainElement(element: ReactTestInstance | null): R;
      toBeEmpty(): R;
      toHaveProp(attr: string, value?: any): R;
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
      toBeEnabled(): R;
      toHaveStyle(style: object[] | object): R;
    }
  }
}
