/// <reference types="jest" />
import type { ReactTestInstance } from 'react-test-renderer';
export declare function toBeDisabled(
  this: jest.MatcherContext,
  element: ReactTestInstance,
): {
  pass: boolean;
  message: () => string;
};
export declare function toBeEnabled(
  this: jest.MatcherContext,
  element: ReactTestInstance,
): {
  pass: boolean;
  message: () => string;
};
