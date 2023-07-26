'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toHaveProp = void 0;
const jest_matcher_utils_1 = require('jest-matcher-utils');
const utils_1 = require('./utils');
function printAttribute(name, value) {
  return value === undefined ? name : `${name}=${(0, jest_matcher_utils_1.stringify)(value)}`;
}
function getPropComment(name, value) {
  return value === undefined
    ? `element.hasProp(${name})`
    : `element.getAttribute(${name}) === ${(0, jest_matcher_utils_1.stringify)(value)}`;
}
function toHaveProp(element, name, expectedValue) {
  (0, utils_1.checkReactElement)(element, toHaveProp, this);
  const prop = element.props[name];
  const isDefined = expectedValue !== undefined;
  const hasProp = name in element.props;
  return {
    pass: isDefined ? hasProp && this.equals(prop, expectedValue) : hasProp,
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      const receivedProp = hasProp ? printAttribute(name, prop) : null;
      const matcher = (0, jest_matcher_utils_1.matcherHint)(
        `${this.isNot ? '.not' : ''}.toHaveProp`,
        'element',
        (0, jest_matcher_utils_1.printExpected)(name),
        {
          secondArgument: isDefined
            ? (0, jest_matcher_utils_1.printExpected)(expectedValue)
            : undefined,
          comment: getPropComment(name, expectedValue),
        },
      );
      return (0, utils_1.getMessage)(
        matcher,
        `Expected the element ${to} have prop`,
        printAttribute(name, expectedValue),
        'Received',
        receivedProp,
      );
    },
  };
}
exports.toHaveProp = toHaveProp;
