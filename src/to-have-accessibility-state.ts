import { AccessibilityState, Modal, StyleSheet } from 'react-native';
import { matcherHint, stringify } from 'jest-matcher-utils';
import type { ReactTestInstance } from 'react-test-renderer';

import { checkReactElement, getMessage, stringifyDefined } from './utils';

export function toHaveAccessibilityState(
  this: jest.MatcherContext,
  element: ReactTestInstance,
  expectedState: AccessibilityState,
) {
  checkReactElement(element, toHaveAccessibilityState, this);

  const impliedState = getAccessibilityState(element);
  return {
    pass: matchAccessibilityState(element, expectedState),
    message: () => {
      const matcher = matcherHint(
        `${this.isNot ? '.not' : ''}.toHaveAccessibilityState`,
        'element',
        stringify(expectedState),
      );
      return getMessage(
        matcher,
        `Expected the element ${this.isNot ? 'not to' : 'to'} have acessibility state`,
        stringify(expectedState),
        'Received element with implied accessibility state',
        stringifyDefined(impliedState),
      );
    },
  };
}

export const accessibilityStateKeys: (keyof AccessibilityState)[] = [
  'disabled',
  'selected',
  'checked',
  'busy',
  'expanded',
];

/**
 * Default accessibility state values based on experiments using accessibility
 * inspector/screen reader on iOS and Android.
 *
 * @see https://github.com/callstack/react-native-testing-library/wiki/Accessibility:-State
 */
const defaultState: AccessibilityState = {
  disabled: false,
  selected: false,
  checked: undefined,
  busy: false,
  expanded: undefined,
};

const getAccessibilityState = (element: ReactTestInstance) => {
  return {
    ...defaultState,
    ...element.props.accessibilityState,
  };
};

export function matchAccessibilityState(element: ReactTestInstance, matcher: AccessibilityState) {
  const state = getAccessibilityState(element);
  return accessibilityStateKeys.every((key) => matchState(state, matcher, key));
}

function matchState(
  state: AccessibilityState,
  matcher: AccessibilityState,
  key: keyof AccessibilityState,
) {
  return matcher[key] === undefined || matcher[key] === state[key];
}
