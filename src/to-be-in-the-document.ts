import type { ReactTestInstance } from 'react-test-renderer';
import { matcherHint, RECEIVED_COLOR } from 'jest-matcher-utils';
import { checkReactElement, printElement } from './utils';

export function toBeInTheDocument(this: jest.MatcherContext, element: ReactTestInstance) {
  if (element !== null) {
    checkReactElement(element, toBeInTheDocument, this);
  }

  const pass = element === null ? false : getScreen().container === getRootElement(element);

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

function getScreen() {
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const { screen } = require('@testing-library/react-native');
    if (!screen) {
      throw new Error('screen is undefined');
    }

    return screen;
  } catch (error) {
    throw new Error(
      'Could not import `screen` object from @testing-library/react-native.\n\n' +
        'Using toBeInTheDocument() matcher requires @testing-library/react-native v10.1.0 or later to be added to your devDependencies.',
    );
  }
}
