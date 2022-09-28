import type { ReactTestInstance } from 'react-test-renderer';
import { matcherHint } from 'jest-matcher-utils';
import { checkReactElement, isEmpty, printDeprecationWarning, printElement } from './utils';

export function toBeEmptyElement(this: jest.MatcherContext, element: ReactTestInstance) {
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

/**
 * @deprecated This function has been renamed to `toBeEmptyElement`.
 */
export function toBeEmpty(this: jest.MatcherContext, element: ReactTestInstance) {
  printDeprecationWarning(
    'toBeEmpty',
    `"toBeEmpty()" matcher has been renamed to "toBeEmptyElement()". Old name will be deleted in future versions of @testing-library/jest-native.`,
  );
  return toBeEmptyElement.call(this, element);
}
