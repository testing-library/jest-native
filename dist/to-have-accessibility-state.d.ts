/// <reference types="jest" />
import type { AccessibilityState } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
export declare function toHaveAccessibilityState(
  this: jest.MatcherContext,
  element: ReactTestInstance,
  expectedState: AccessibilityState,
): {
  pass: boolean;
  message: () => string;
};
