/// <reference types="jest" />
import type { ReactTestInstance } from 'react-test-renderer';
export declare function toBeEmptyElement(
  this: jest.MatcherContext,
  element: ReactTestInstance,
): {
  pass: boolean;
  message: () => string;
};
/**
 * @deprecated This function has been renamed to `toBeEmptyElement`.
 */
export declare function toBeEmpty(
  this: jest.MatcherContext,
  element: ReactTestInstance,
): {
  pass: boolean;
  message: () => string;
};
