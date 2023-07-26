'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.toBeOnTheScreen = void 0;
const jest_matcher_utils_1 = require('jest-matcher-utils');
const utils_1 = require('./utils');
function toBeOnTheScreen(element) {
  if (element !== null) {
    (0, utils_1.checkReactElement)(element, toBeOnTheScreen, this);
  }
  const pass = element === null ? false : getScreenRoot() === getRootElement(element);
  const errorFound = () => {
    return `expected element tree not to contain element but found:\n${(0, utils_1.printElement)(
      element,
    )}`;
  };
  const errorNotFound = () => {
    return `element could not be found in the element tree`;
  };
  return {
    pass,
    message: () => {
      return [
        (0, jest_matcher_utils_1.matcherHint)(
          `${this.isNot ? '.not' : ''}.toBeOnTheScreen`,
          'element',
          '',
        ),
        '',
        (0, jest_matcher_utils_1.RECEIVED_COLOR)(this.isNot ? errorFound() : errorNotFound()),
      ].join('\n');
    },
  };
}
exports.toBeOnTheScreen = toBeOnTheScreen;
function getRootElement(element) {
  let root = element;
  while (root.parent) {
    root = root.parent;
  }
  return root;
}
function getScreenRoot() {
  try {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const { screen } = require('@testing-library/react-native');
    if (!screen) {
      throw new Error('screen is undefined');
    }
    return screen.UNSAFE_root ?? screen.container;
  } catch (error) {
    throw new Error(
      'Could not import `screen` object from @testing-library/react-native.\n\n' +
        'Using toBeOnTheScreen() matcher requires @testing-library/react-native v10.1.0 or later to be added to your devDependencies.',
    );
  }
}
