import { matcherHint } from 'jest-matcher-utils';
import compose from 'ramda/src/compose.js';
import defaultTo from 'ramda/src/defaultTo.js';
import path from 'ramda/src/path.js';
import isEmpty from 'ramda/src/isEmpty.js';

import { checkReactElement, printElement } from './utils';

export function toBeEmpty(element) {
  checkReactElement(element, toBeEmpty, this);

  return {
    pass: compose(isEmpty, defaultTo({}), path(['props', 'children']))(element),
    message: () => {
      return [
        matcherHint(`${this.isNot ? '.not' : ''}.toBeEmpty`, 'element', ''),
        '',
        'Received:',
        printElement(element),
      ].join('\n');
    },
  };
}
