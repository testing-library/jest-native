import { matcherHint } from 'jest-matcher-utils';
import pipe from 'ramda/src/pipe';
import always from 'ramda/src/always';
import is from 'ramda/src/is';
import join from 'ramda/src/join';
import reduce from 'ramda/src/reduce';
import concat from 'ramda/src/concat';
import unless from 'ramda/src/unless';

import { checkReactElement, getMessage, matches, normalize } from './utils';

const unlessStringEmpty = unless(is(String), always(''));

const collectNormalizedText = pipe(collectChildrenText, join(''), normalize);

function collectChildrenText(element) {
  if (!element || !element.children) {
    return [unlessStringEmpty(element)];
  }

  return reduce((texts, child) => concat(texts, collectChildrenText(child)), [], element.children);
}

export function toHaveTextContent(element, checkWith) {
  checkReactElement(element, toHaveTextContent, this);

  const textContent = collectNormalizedText(element);

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
