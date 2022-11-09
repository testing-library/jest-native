import type { AccessibilityState } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { matcherHint, stringify } from 'jest-matcher-utils';
import { checkReactElement, getMessage } from './utils';

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
        stringify(impliedState),
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
  busy: false,
};

const getAccessibilityState = (element: ReactTestInstance) => {
  return {
    ...defaultState,
    ...element.props.accessibilityState,
  };
};

export function matchAccessibilityState(element: ReactTestInstance, matcher: AccessibilityState) {
  const state = getAccessibilityState(element);
  return accessibilityStateKeys.every((key) => matchStateEntry(state, matcher, key));
}

function matchStateEntry(
  state: AccessibilityState,
  matcher: AccessibilityState,
  key: keyof AccessibilityState,
) {
  return matcher[key] === undefined || matcher[key] === state[key];
}
