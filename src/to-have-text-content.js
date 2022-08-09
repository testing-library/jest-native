import { matcherHint } from 'jest-matcher-utils';
import { checkReactElement, getMessage, matches, normalize } from './utils';

function collectNormalizedText(element) {
  const childrenText = collectChildrenText(element).join('');
  return normalize(childrenText);
}

function collectChildrenText(element) {
  if (!element || !element.children) {
    return typeof element === 'string' ? [element] : [''];
  }

  return element.children.reduce((texts, child) => texts.concat(collectChildrenText(child)), []);
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
