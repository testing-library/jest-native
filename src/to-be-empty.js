import { matcherHint } from 'jest-matcher-utils';
import compose from 'ramda/src/compose';
import defaultTo from 'ramda/src/defaultTo';
import path from 'ramda/src/path';
import isEmpty from 'ramda/src/isEmpty';

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
