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
import type { Falsy, TextStyle, ViewStyle } from 'react-native';

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
  constructor(
    received: ReactTestInstance | null | undefined,
    matcherFn: Function,
    context: jest.MatcherContext,
  ) {
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
  matcherFn: Function,
  context: jest.MatcherContext,
) {
  if (!element) {
    throw new ReactElementTypeError(element, matcherFn, context);
  }

  // @ts-expect-error not sure where to get this fiber property
  if (!element._fiber && !VALID_ELEMENTS.includes(element.type.toString())) {
    throw new ReactElementTypeError(element, matcherFn, context);
  }
}

function getType({ type }: any) {
  return type.displayName || type.name || type;
}

function printElement({ props }: any) {
  return `  ${prettyFormat(
    { props },
    {
      plugins: [ReactTestComponent, ReactElement],
      printFunctionName: false,
      highlight: true,
    },
  )}`;
}

function display(value: any) {
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

type StyleRecord = {
  [P in keyof TextStyle | keyof ViewStyle]?: TextStyle[P];
};

function getStylePropAsRecord(styles: Falsy | Object | Object[]): StyleRecord {
  if (!styles) return {};

  if (Array.isArray(styles)) {
    const flatStyles = styles.flat();
    let result = {};

    for (const styleItem of flatStyles) {
      const entries = Object.entries(styleItem);

      for (const [key, value] of entries) {
        // @ts-ignore how to type it?
        result[key] = value;
      }
    }

    return result;
  }

  return styles as StyleRecord;
}

function isEmpty(value: any) {
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

const warned = {};

export function printDeprecationWarning(functionName, message) {
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
  getStylePropAsRecord,
  isEmpty,
  printElement,
  display,
};
