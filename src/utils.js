import redent from 'redent';
import {
  RECEIVED_COLOR as receivedColor,
  EXPECTED_COLOR as expectedColor,
  matcherHint,
  printWithType,
  printReceived,
  stringify,
} from 'jest-matcher-utils';
import prettyFormat, { plugins } from 'pretty-format';

const { ReactTestComponent, ReactElement } = plugins;

const VALID_ELEMENTS = [
  'Image',
  'Text',
  'TextInput',
  'Modal',
  'View',
  'RefreshControl',
  'ScrollView',
  'ActivityIndicator',
  'ListView',
  'ListViewDataSource',
];

class ReactElementTypeError extends Error {
  constructor(received, matcherFn, context) {
    super();

    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    let withType = '';
    try {
      withType = printWithType('Received', received, printReceived);
    } catch (e) {}
    /* istanbul ignore next */
    this.message = [
      matcherHint(`${context.isNot ? '.not' : ''}.${matcherFn.name}`, 'received', ''),
      '',
      `${receivedColor('received')} value must be a React Element.`,
      withType,
    ].join('\n');
  }
}

function checkReactElement(element, ...args) {
  if (!VALID_ELEMENTS.includes(element.type) && !element._fiber) {
    throw new ReactElementTypeError(element, ...args);
  }
}

function getType({ type }) {
  return type.displayName || type.name || type;
}

function printElement({ props }) {
  return `  ${prettyFormat(
    { props },
    {
      plugins: [ReactTestComponent, ReactElement],
      printFunctionName: false,
      highlight: true,
    },
  )}`;
}

function display(value) {
  return typeof value === 'string' ? value : stringify(value);
}

function getMessage(matcher, expectedLabel, expectedValue, receivedLabel, receivedValue) {
  return [
    `${matcher}\n`,
    `${expectedLabel}:\n${expectedColor(redent(display(expectedValue), 2))}`,
    `${receivedLabel}:\n${receivedColor(redent(display(receivedValue), 2))}`,
  ].join('\n');
}

function matches(textToMatch, matcher) {
  if (matcher instanceof RegExp) {
    return matcher.test(textToMatch);
  } else {
    return textToMatch.includes(String(matcher));
  }
}

function normalize(text) {
  return text.replace(/\s+/g, ' ').trim();
}

export {
  ReactElementTypeError,
  checkReactElement,
  getType,
  getMessage,
  matches,
  normalize,
  printElement,
};
