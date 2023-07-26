'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toHaveAccessibilityValue = void 0;
const jest_matcher_utils_1 = require('jest-matcher-utils');
const utils_1 = require('./utils');
function toHaveAccessibilityValue(element, expectedValue) {
  (0, utils_1.checkReactElement)(element, toHaveAccessibilityValue, this);
  const value = element.props.accessibilityValue;
  return {
    pass: matchAccessibilityValue(value, expectedValue),
    message: () => {
      const matcher = (0, jest_matcher_utils_1.matcherHint)(
        `${this.isNot ? '.not' : ''}.toHaveAccessibilityValue`,
        'element',
        (0, jest_matcher_utils_1.stringify)(expectedValue),
      );
      return (0, utils_1.getMessage)(
        matcher,
        `Expected the element ${this.isNot ? 'not to' : 'to'} have accessibility value`,
        (0, jest_matcher_utils_1.stringify)(expectedValue),
        'Received element with accessibility value',
        (0, jest_matcher_utils_1.stringify)(value),
      );
    },
  };
}
exports.toHaveAccessibilityValue = toHaveAccessibilityValue;
function matchAccessibilityValue(value, matcher) {
  return (
    (matcher.min === undefined || matcher.min === value.min) &&
    (matcher.max === undefined || matcher.max === value.max) &&
    (matcher.now === undefined || matcher.now === value.now) &&
    (matcher.text === undefined || (0, utils_1.matches)(value.text ?? '', matcher.text))
  );
}
