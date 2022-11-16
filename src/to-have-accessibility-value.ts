import type { AccessibilityValue } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { matcherHint, stringify } from 'jest-matcher-utils';
import { checkReactElement, getMessage, matches } from './utils';

export interface AccessibilityValueMatcher {
  min?: number;
  max?: number;
  now?: number;
  text?: string | RegExp;
}

export function toHaveAccessibilityValue(
  this: jest.MatcherContext,
  element: ReactTestInstance,
  expectedValue: AccessibilityValueMatcher,
) {
  checkReactElement(element, toHaveAccessibilityValue, this);

  const value = element.props.accessibilityValue;

  return {
    pass: matchAccessibilityValue(value, expectedValue),
    message: () => {
      const matcher = matcherHint(
        `${this.isNot ? '.not' : ''}.toHaveAccessibilityValue`,
        'element',
        stringify(expectedValue),
      );
      return getMessage(
        matcher,
        `Expected the element ${this.isNot ? 'not to' : 'to'} have accessibility value`,
        stringify(expectedValue),
        'Received element with accessibility value',
        stringify(value),
      );
    },
  };
}

function matchAccessibilityValue(
  value: AccessibilityValue,
  matcher: AccessibilityValueMatcher,
): boolean {
  return (
    (matcher.min === undefined || matcher.min === value.min) &&
    (matcher.max === undefined || matcher.max === value.max) &&
    (matcher.now === undefined || matcher.now === value.now) &&
    (matcher.text === undefined || matches(value.text ?? '', matcher.text))
  );
}
