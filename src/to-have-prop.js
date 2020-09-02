import { equals, isNil, not } from 'ramda';
import { matcherHint, stringify, printExpected } from 'jest-matcher-utils';
import { checkReactElement, getMessage, VALID_ELEMENTS } from './utils';

function printAttribute(name, value) {
  return value === undefined ? name : `${name}=${stringify(value)}`;
}

function getPropComment(name, value) {
  return value === undefined
    ? `element.hasProp(${stringify(name)})`
    : `element.getAttribute(${stringify(name)}) === ${stringify(value)}`;
}

export function toHaveProp(element, name, expectedValue) {
  checkReactElement(element, toHaveProp, this);

  const prop = element.props[name];

  const isDefined = expectedValue !== undefined;
  const elementType = typeof element.type == 'string' ? element.type : element.type?.displayName;
  const isAllowed = VALID_ELEMENTS.includes(elementType);
  const hasProp = not(isNil(prop));

  return {
    pass: isDefined && isAllowed ? hasProp && equals(prop, expectedValue) : hasProp,
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      const receivedProp = hasProp ? printAttribute(name, prop) : null;
      const matcher = matcherHint(
        `${this.isNot ? '.not' : ''}.toHaveProp`,
        'element',
        printExpected(name),
        {
          secondArgument: isDefined ? printExpected(expectedValue) : undefined,
          comment: getPropComment(name, expectedValue),
        },
      );
      return getMessage(
        matcher,
        `Expected the element ${to} have prop`,
        printAttribute(name, expectedValue),
        'Received',
        receivedProp,
      );
    },
  };
}
