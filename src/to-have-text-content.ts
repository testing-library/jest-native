import { matcherHint } from 'jest-matcher-utils';
import type { ReactTestInstance } from 'react-test-renderer';
import { checkReactElement, getMessage, matches, normalize } from './utils';

function collectNormalizedText(element: ReactTestInstance) {
  const childrenText = collectChildrenText(element).join('');
  return normalize(childrenText);
}

function collectChildrenText(element: string | ReactTestInstance): string[] {
  if (typeof element === 'string') return [element];
  if (!element || !element.children) return [''];

  let result: string[] = [];

  for (const child of element.children) {
    result = result.concat(collectChildrenText(child));
  }

  return result;
}

export function toHaveTextContent(
  this: jest.MatcherContext,
  element: ReactTestInstance,
  checkWith: string | RegExp,
) {
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
