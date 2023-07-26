/// <reference types="jest" />
import type { ReactTestInstance } from 'react-test-renderer';
export declare function toContainElement(
  this: jest.MatcherContext,
  container: ReactTestInstance,
  element: ReactTestInstance | null,
): {
  pass: boolean;
  message: () => string;
};
