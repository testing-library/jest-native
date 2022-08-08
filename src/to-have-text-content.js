import { matcherHint } from 'jest-matcher-utils';
import compose from 'ramda/src/compose';
import defaultTo from 'ramda/src/defaultTo';
import is from 'ramda/src/is';
import join from 'ramda/src/join';
import map from 'ramda/src/map';
import path from 'ramda/src/path';
import filter from 'ramda/src/filter';

import { checkReactElement, getMessage, matches, normalize } from './utils';

function getText(child, currentValue = '') {
  let value = currentValue;

  if (!child) {
    return value;
  } else if (Array.isArray(child)) {
    return child.reduce((acc, element) => acc + getText(element), '');
  } else if (typeof child === 'object') {
    return getText(path(['props', 'children'], child), value);
  } else {
    return `${value}${child}`;
  }
}

export function toHaveTextContent(element, checkWith) {
  checkReactElement(element, toHaveTextContent, this);

  // step 9: enjoy your text content ☺️
  const textContent = compose(
    // step 8: strip out extra whitespace
    normalize,
    // step 7: join the resulting array
    join(''),
    // step 6: filter out values hidden by React
    filter(child => typeof child === 'string' || typeof child === 'number'),
    // step 5: map the array to get text content
    map(child => (typeof child === 'object' ? getText(child) : child)),
    // step 4: make sure non-array children end up in an array
    child => (is(Array, child) ? child : [child]),
    // step 3: default to an array
    defaultTo([]),
    // step 2: drill down to the children
    path(['props', 'children']),
    // step 1: get the element
  )(element);

  return {
    pass: matches(textContent, checkWith),
    message: () => {
      const to = this.isNot ? 'not to' : 'to';
      return getMessage(
        matcherHint(`${this.isNot ? '.not' : ''}.toHaveTextContent`, 'element', ''),
        `Expected element ${to} have text content`,
        checkWith,
        'Received',
        textContent,
      );
    },
  };
}
