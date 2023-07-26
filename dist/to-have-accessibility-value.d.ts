/// <reference types="jest" />
import type { ReactTestInstance } from 'react-test-renderer';
export interface AccessibilityValueMatcher {
  min?: number;
  max?: number;
  now?: number;
  text?: string | RegExp;
}
export declare function toHaveAccessibilityValue(
  this: jest.MatcherContext,
  element: ReactTestInstance,
  expectedValue: AccessibilityValueMatcher,
): {
  pass: boolean;
  message: () => string;
};
