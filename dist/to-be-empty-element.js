'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toBeEmpty = exports.toBeEmptyElement = void 0;
const jest_matcher_utils_1 = require('jest-matcher-utils');
const utils_1 = require('./utils');
function toBeEmptyElement(element) {
  (0, utils_1.checkReactElement)(element, toBeEmptyElement, this);
  return {
    pass: (0, utils_1.isEmpty)(element?.props?.children),
    message: () => {
      return [
        (0, jest_matcher_utils_1.matcherHint)(
          `${this.isNot ? '.not' : ''}.toBeEmpty`,
          'element',
          '',
        ),
        '',
        'Received:',
        (0, utils_1.printElement)(element),
      ].join('\n');
    },
  };
}
exports.toBeEmptyElement = toBeEmptyElement;
/**
 * @deprecated This function has been renamed to `toBeEmptyElement`.
 */
function toBeEmpty(element) {
  (0, utils_1.printDeprecationWarning)(
    'toBeEmpty',
    `"toBeEmpty()" matcher has been renamed to "toBeEmptyElement()". Old name will be deleted in future versions of @testing-library/jest-native.`,
  );
  return toBeEmptyElement.call(this, element);
}
exports.toBeEmpty = toBeEmpty;
