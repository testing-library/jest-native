'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toBeVisible = void 0;
const react_native_1 = require('react-native');
const jest_matcher_utils_1 = require('jest-matcher-utils');
const utils_1 = require('./utils');
const component_tree_1 = require('./component-tree');
function isVisibleForStyles(element) {
  const style = element.props.style || {};
  const { display, opacity } = react_native_1.StyleSheet.flatten(style);
  return display !== 'none' && opacity !== 0;
}
function isVisibleForAccessibility(element) {
  return (
    !element.props.accessibilityElementsHidden &&
    element.props.importantForAccessibility !== 'no-hide-descendants'
  );
}
function isModalVisible(element) {
  return element.type !== react_native_1.Modal || element.props.visible !== false;
}
function isElementVisible(element) {
  let current = element;
  while (current) {
    if (
      !isVisibleForStyles(current) ||
      !isVisibleForAccessibility(current) ||
      !isModalVisible(current)
    ) {
      return false;
    }
    current = (0, component_tree_1.getParentElement)(current, [react_native_1.Modal]);
  }
  return true;
}
function toBeVisible(element) {
  (0, utils_1.checkReactElement)(element, toBeVisible, this);
  const isVisible = isElementVisible(element);
  return {
    pass: isVisible,
    message: () => {
      const is = isVisible ? 'is' : 'is not';
      return [
        (0, jest_matcher_utils_1.matcherHint)(
          `${this.isNot ? '.not' : ''}.toBeVisible`,
          'element',
          '',
        ),
        '',
        `Received element ${is} visible:`,
        (0, utils_1.printElement)(element),
      ].join('\n');
    },
  };
}
exports.toBeVisible = toBeVisible;
