'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toHaveStyle = void 0;
const react_native_1 = require('react-native');
const jest_matcher_utils_1 = require('jest-matcher-utils');
const jest_diff_1 = require('jest-diff');
const utils_1 = require('./utils');
function printoutStyles(style) {
  return Object.keys(style)
    .sort()
    .map((prop) =>
      Array.isArray(style[prop])
        ? `${prop}: ${JSON.stringify(style[prop], null, 2)};`
        : `${prop}: ${style[prop]};`,
    )
    .join('\n');
}
/**
 * Narrows down the properties in received to those with counterparts in expected
 */
function narrow(expected, received) {
  return Object.keys(received)
    .filter((prop) => expected[prop])
    .reduce(
      (obj, prop) =>
        Object.assign(obj, {
          [prop]: received[prop],
        }),
      {},
    );
}
// Highlights only style rules that were expected but were not found in the
// received computed styles
function expectedDiff(expected, received) {
  const receivedNarrow = narrow(expected, received);
  const diffOutput = (0, jest_diff_1.diff)(
    printoutStyles(expected),
    printoutStyles(receivedNarrow),
  );
  // Remove the "+ Received" annotation because this is a one-way diff
  return diffOutput?.replace(`'+ Received'\n`, '') ?? '';
}
function toHaveStyle(element, style) {
  (0, utils_1.checkReactElement)(element, toHaveStyle, this);
  const expected = react_native_1.StyleSheet.flatten(style) ?? {};
  const received = react_native_1.StyleSheet.flatten(element.props.style) ?? {};
  return {
    pass: Object.entries(expected).every(([prop, value]) => this.equals(received?.[prop], value)),
    message: () => {
      const matcher = `${this.isNot ? '.not' : ''}.toHaveStyle`;
      return [
        (0, jest_matcher_utils_1.matcherHint)(matcher, 'element', ''),
        expectedDiff(expected, received),
      ].join('\n\n');
    },
  };
}
exports.toHaveStyle = toHaveStyle;
