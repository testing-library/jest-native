import equals from 'ramda/src/equals.js';
import { matcherHint, RECEIVED_COLOR as receivedColor } from 'jest-matcher-utils';

import { checkReactElement, printElement } from './utils';

export function toContainElement(container, element) {
  checkReactElement(container, toContainElement, this);

  if (element !== null) {
    checkReactElement(element, toContainElement, this);
  }

  let matches = [];

  if (element) {
    matches = container.findAll(node => {
      const sameType = equals(node.type, element.type);
      const sameProps = equals(node.props, element.props);

      return sameType && sameProps;
    });
  }

  return {
    pass: Boolean(matches.length),
    message: () => {
      return [
        matcherHint(`${this.isNot ? '.not' : ''}.toContainElement`, 'element', 'element'),
        '',
        receivedColor(`${printElement(container)} ${
          this.isNot ? '\n\ncontains:\n\n' : '\n\ndoes not contain:\n\n'
        } ${printElement(element)}
        `),
      ].join('\n');
    },
  };
}
