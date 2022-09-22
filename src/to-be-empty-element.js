import { matcherHint } from 'jest-matcher-utils';
import { checkReactElement, isEmpty, printElement } from './utils';

export function toBeEmptyElement(element) {
  checkReactElement(element, toBeEmptyElement, this);

  return {
    pass: isEmpty(element?.props?.children),
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
