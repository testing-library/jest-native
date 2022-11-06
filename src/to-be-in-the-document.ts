import type { ReactTestInstance } from 'react-test-renderer';
import { matcherHint, stringify, RECEIVED_COLOR } from 'jest-matcher-utils';
import { checkReactElement, printElement } from './utils';
import { screen } from '@testing-library/react-native';

export function toBeInTheDocument(this: jest.MatcherContext, element: ReactTestInstance) {
  if (element !== null) {
    checkReactElement(element, toBeInTheDocument, this);
  }

  const pass = element === null ? false : screen.container === getRootElement(element);

  const errorFound = () => {
    return `expected document not to contain element but found:\n${printElement(element)}`;
  };

  const errorNotFound = () => {
    return `element could not be found in the document`;
  };

  return {
    pass,
    message: () => {
      return [
        matcherHint(`${this.isNot ? '.not' : ''}.toBeInTheDocument`, 'element', ''),
        '',
        RECEIVED_COLOR(this.isNot ? errorFound() : errorNotFound()),
      ].join('\n');
    },
  };
}

function getRootElement(element: ReactTestInstance) {
  let root = element;
  while (root.parent) {
    root = root.parent;
  }
  return root;
}
