import { matcherHint } from 'jest-matcher-utils';

import { checkReactElement, printElement } from './utils';

export function toBeDisabled(element) {
  checkReactElement(element, toBeDisabled, this);

  const isDisabled = !(element.props?.onStartShouldSetResponder?.() ?? true);

  return {
    pass: isDisabled,
    message: () => {
      const is = isDisabled ? 'is' : 'is not';
      return [
        matcherHint(`${this.isNot ? '.not' : ''}.toBeDisabled`, 'element', ''),
        '',
        `Received element ${is} disabled:`,
        printElement(element),
      ].join('\n');
    },
  };
}
