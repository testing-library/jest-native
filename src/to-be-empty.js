import { matcherHint } from 'jest-matcher-utils';
import { compose, defaultTo, path, isEmpty } from 'ramda';
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
