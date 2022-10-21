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
import type { ReactTestInstance } from 'react-test-renderer';

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
  constructor(received: unknown, matcherFn: jest.CustomMatcher, context: jest.MatcherContext) {
    super();

    /* istanbul ignore next */
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, matcherFn);
    }
    let withType = '';
    try {
      withType = printWithType('Received', received, printReceived);
    } catch (e) {
      // Deliberately empty.
    }

    /* istanbul ignore next */
    this.message = [
      matcherHint(`${context.isNot ? '.not' : ''}.${matcherFn.name}`, 'received', ''),
      '',
      `${receivedColor('received')} value must be a React Element.`,
      withType,
    ].join('\n');
  }
}

function checkReactElement(
  element: ReactTestInstance | null | undefined,
  matcherFn: jest.CustomMatcher,
  context: jest.MatcherContext,
): asserts element is ReactTestInstance {
  if (!element) {
    throw new ReactElementTypeError(element, matcherFn, context);
  }

  // @ts-expect-error internal _fiber property of ReactTestInstance
  if (!element._fiber && !VALID_ELEMENTS.includes(element.type.toString())) {
    throw new ReactElementTypeError(element, matcherFn, context);
  }
}

function getType({ type }: ReactTestInstance) {
  // @ts-expect-error: ReactTestInstance contains too loose typing
  return type.displayName || type.name || type;
}

function printElement(element: ReactTestInstance | null) {
  if (element == null) {
    return 'null';
  }

  return redent(
    prettyFormat(
      {
        // This prop is needed persuade the prettyFormat that the element is
        // a ReactTestRendererJSON instance, so it is formatted as JSX.
        $$typeof: Symbol.for('react.test.json'),
        type: element.type,
        props: element.props,
      },
      {
        plugins: [ReactTestComponent, ReactElement],
        printFunctionName: false,
        printBasicPrototype: false,
        highlight: true,
      },
    ),
    2,
  );
}

function display(value: unknown) {
  return typeof value === 'string' ? value : stringify(value);
}

function getMessage(
  matcher: string,
  expectedLabel: string,
  expectedValue: string | RegExp,
  receivedLabel: string,
  receivedValue: string | null,
) {
  return [
    `${matcher}\n`,
    `${expectedLabel}:\n${expectedColor(redent(display(expectedValue), 2))}`,
    `${receivedLabel}:\n${receivedColor(redent(display(receivedValue), 2))}`,
  ].join('\n');
}

function matches(textToMatch: string, matcher: string | RegExp) {
  if (matcher instanceof RegExp) {
    return matcher.test(textToMatch);
  }

  return textToMatch.includes(matcher);
}

function normalize(text: string) {
  return text.replace(/\s+/g, ' ').trim();
}

function isEmpty(value: unknown) {
  if (!value) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
}

const warned: Record<string, boolean> = {};

export function printDeprecationWarning(functionName: string, message: string) {
  if (warned[functionName]) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(`Deprecation Warning:\n${message}`);
  warned[functionName] = true;
}

export {
  ReactElementTypeError,
  checkReactElement,
  getType,
  getMessage,
  matches,
  normalize,
  isEmpty,
  printElement,
};
