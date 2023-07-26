'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toContainElement = void 0;
const jest_matcher_utils_1 = require('jest-matcher-utils');
const utils_1 = require('./utils');
function toContainElement(container, element) {
  (0, utils_1.checkReactElement)(container, toContainElement, this);
  if (element !== null) {
    (0, utils_1.checkReactElement)(element, toContainElement, this);
  }
  let matches = [];
  if (element) {
    matches = container.findAll((node) => {
      return node.type === element.type && this.equals(node.props, element.props);
    });
  }
  return {
    pass: Boolean(matches.length),
    message: () => {
      return [
        (0, jest_matcher_utils_1.matcherHint)(
          `${this.isNot ? '.not' : ''}.toContainElement`,
          'element',
          'element',
        ),
        '',
        (0, jest_matcher_utils_1.RECEIVED_COLOR)(`${(0, utils_1.printElement)(container)} ${
          this.isNot ? '\n\ncontains:\n\n' : '\n\ndoes not contain:\n\n'
        } ${(0, utils_1.printElement)(element)}
        `),
      ].join('\n');
    },
  };
}
exports.toContainElement = toContainElement;
