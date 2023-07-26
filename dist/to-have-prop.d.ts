/// <reference types="jest" />
import type { ReactTestInstance } from 'react-test-renderer';
export declare function toHaveProp(
  this: jest.MatcherContext,
  element: ReactTestInstance,
  name: string,
  expectedValue: unknown,
): {
  pass: boolean;
  message: () => string;
};
