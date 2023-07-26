'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toHaveTextContent = void 0;
const jest_matcher_utils_1 = require('jest-matcher-utils');
const utils_1 = require('./utils');
function collectNormalizedText(element) {
  const childrenText = collectChildrenText(element).join('');
  return (0, utils_1.normalize)(childrenText);
}
function collectChildrenText(element) {
  if (typeof element === 'string') return [element];
  if (!element?.children) return [];
  const result = [];
  element.children.forEach((child) => {
    result.push(...collectChildrenText(child));
  });
  return result;
}
function toHaveTextContent(element, checkWith) {
  (0, utils_1.checkReactElement)(element, toHaveTextContent, this);
  const textContent = collectNormalizedText(element);
  return {
    pass: (0, utils_1.matches)(textContent, checkWith),
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      return (0, utils_1.getMessage)(
        (0, jest_matcher_utils_1.matcherHint)(
          `${this.isNot ? '.not' : ''}.toHaveTextContent`,
          'element',
          '',
        ),
        `Expected element ${to} have text content`,
        checkWith,
        'Received',
        textContent,
      );
    },
  };
}
exports.toHaveTextContent = toHaveTextContent;
