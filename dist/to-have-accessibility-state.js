'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toHaveAccessibilityState = void 0;
const jest_matcher_utils_1 = require('jest-matcher-utils');
const utils_1 = require('./utils');
function toHaveAccessibilityState(element, expectedState) {
  (0, utils_1.checkReactElement)(element, toHaveAccessibilityState, this);
  const impliedState = getAccessibilityState(element);
  return {
    pass: matchAccessibilityState(element, expectedState),
    message: () => {
      const matcher = (0, jest_matcher_utils_1.matcherHint)(
        `${this.isNot ? '.not' : ''}.toHaveAccessibilityState`,
        'element',
        (0, jest_matcher_utils_1.stringify)(expectedState),
      );
      return (0, utils_1.getMessage)(
        matcher,
        `Expected the element ${this.isNot ? 'not to' : 'to'} have accessibility state`,
        (0, jest_matcher_utils_1.stringify)(expectedState),
        'Received element with implied accessibility state',
        (0, jest_matcher_utils_1.stringify)(impliedState),
      );
    },
  };
}
exports.toHaveAccessibilityState = toHaveAccessibilityState;
/**
 * Default accessibility state values based on experiments using accessibility
 * inspector/screen reader on iOS and Android.
 *
 * @see https://github.com/callstack/react-native-testing-library/wiki/Accessibility:-State
 */
const defaultState = {
  disabled: false,
  selected: false,
  busy: false,
};
const getAccessibilityState = (element) => {
  return {
    ...defaultState,
    ...element.props.accessibilityState,
  };
};
const accessibilityStateKeys = ['disabled', 'selected', 'checked', 'busy', 'expanded'];
function matchAccessibilityState(element, matcher) {
  const state = getAccessibilityState(element);
  return accessibilityStateKeys.every((key) => matchStateEntry(state, matcher, key));
}
function matchStateEntry(state, matcher, key) {
  return matcher[key] === undefined || matcher[key] === state[key];
}
