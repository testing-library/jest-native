import { matcherHint } from 'jest-matcher-utils';
import { mergeAll } from 'ramda';

import { checkReactElement, printElement } from './utils';

function isStyleVisible(element) {
  const style = element.props.style || {};
  const { display = 'flex', opacity = 1 } = Array.isArray(style) ? mergeAll(style) : style;
  return display !== 'none' && opacity !== 0;
}

function isAttributeVisible(element) {
  return element.type !== 'Modal' || element.props.visible !== false;
}

function isElementVisible(element) {
  return (
    isStyleVisible(element) &&
    isAttributeVisible(element) &&
    (!element.parent || isElementVisible(element.parent))
  );
}

export function toBeVisible(element) {
  checkReactElement(element, toBeVisible, this);
  const isVisible = isElementVisible(element);
  return {
    pass: isVisible,
    message: () => {
      const is = isVisible ? 'is' : 'is not';
      return [
        matcherHint(`${this.isNot ? '.not' : ''}.toBeVisible`, 'element', ''),
        '',
        `Received element ${is} visible:`,
        printElement(element),
      ].join('\n');
    },
  };
}
