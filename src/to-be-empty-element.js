import { matcherHint } from 'jest-matcher-utils';
import { checkReactElement, isEmpty, printDeprecationWarning, printElement } from './utils';

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

/**
 * @deprecated This function is deprecated. You should use `toBeEmptyElement`
 *
 * */
export function toBeEmpty(element) {
  printDeprecationWarning(
    'toBeEmpty',
    `"toBeEmpty()" matcher has been renamed to "toBeEmptyElement()". Old name will be deleted in future versions of @testing-library/jest-native.`,
  );
  return toBeEmptyElement(element);
}
