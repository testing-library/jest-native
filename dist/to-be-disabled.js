'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toBeEnabled = exports.toBeDisabled = void 0;
const jest_matcher_utils_1 = require('jest-matcher-utils');
const utils_1 = require('./utils');
// Elements that support 'disabled'
const DISABLE_TYPES = [
  'Button',
  'Slider',
  'Switch',
  'Text',
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
  'View',
  'TextInput',
  'Pressable',
];
function isElementDisabled(element) {
  if ((0, utils_1.getType)(element) === 'TextInput' && element?.props?.editable === false) {
    return true;
  }
  if (!DISABLE_TYPES.includes((0, utils_1.getType)(element))) {
    return false;
  }
  return (
    !!element?.props?.disabled ||
    !!element?.props?.accessibilityState?.disabled ||
    !!element?.props?.accessibilityStates?.includes('disabled')
  );
}
function isAncestorDisabled(element) {
  const parent = element.parent;
  return parent != null && (isElementDisabled(element) || isAncestorDisabled(parent));
}
function toBeDisabled(element) {
  (0, utils_1.checkReactElement)(element, toBeDisabled, this);
  const isDisabled = isElementDisabled(element) || isAncestorDisabled(element);
  return {
    pass: isDisabled,
    message: () => {
      const is = isDisabled ? 'is' : 'is not';
      return [
        (0, jest_matcher_utils_1.matcherHint)(
          `${this.isNot ? '.not' : ''}.toBeDisabled`,
          'element',
          '',
        ),
        '',
        `Received element ${is} disabled:`,
        (0, utils_1.printElement)(element),
      ].join('\n');
    },
  };
}
exports.toBeDisabled = toBeDisabled;
function toBeEnabled(element) {
  (0, utils_1.checkReactElement)(element, toBeEnabled, this);
  const isEnabled = !isElementDisabled(element) && !isAncestorDisabled(element);
  return {
    pass: isEnabled,
    message: () => {
      const is = isEnabled ? 'is' : 'is not';
      return [
        (0, jest_matcher_utils_1.matcherHint)(
          `${this.isNot ? '.not' : ''}.toBeEnabled`,
          'element',
          '',
        ),
        '',
        `Received element ${is} enabled:`,
        (0, utils_1.printElement)(element),
      ].join('\n');
    },
  };
}
exports.toBeEnabled = toBeEnabled;
