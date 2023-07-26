/// <reference types="jest" />
import type { ReactTestInstance } from 'react-test-renderer';
export declare function toHaveTextContent(
  this: jest.MatcherContext,
  element: ReactTestInstance,
  checkWith: string | RegExp,
): {
  pass: boolean;
  message: () => string;
};
