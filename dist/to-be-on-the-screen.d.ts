/// <reference types="jest" />
import type { ReactTestInstance } from 'react-test-renderer';
export declare function toBeOnTheScreen(
  this: jest.MatcherContext,
  element: ReactTestInstance,
): {
  pass: boolean;
  message: () => string;
};
