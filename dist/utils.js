'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.printElement =
  exports.isEmpty =
  exports.normalize =
  exports.matches =
  exports.getMessage =
  exports.getType =
  exports.checkReactElement =
  exports.ReactElementTypeError =
  exports.printDeprecationWarning =
    void 0;
const redent_1 = __importDefault(require('redent'));
const jest_matcher_utils_1 = require('jest-matcher-utils');
const pretty_format_1 = __importStar(require('pretty-format'));
const { ReactTestComponent, ReactElement } = pretty_format_1.plugins;
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
      withType = (0, jest_matcher_utils_1.printWithType)(
        'Received',
        received,
        jest_matcher_utils_1.printReceived,
      );
    } catch (e) {
      // Deliberately empty.
    }
    /* istanbul ignore next */
    this.message = [
      (0, jest_matcher_utils_1.matcherHint)(
        `${context.isNot ? '.not' : ''}.${matcherFn.name}`,
        'received',
        '',
      ),
      '',
      `${(0, jest_matcher_utils_1.RECEIVED_COLOR)('received')} value must be a React Element.`,
      withType,
    ].join('\n');
  }
}
exports.ReactElementTypeError = ReactElementTypeError;
function checkReactElement(element, matcherFn, context) {
  if (!element) {
    throw new ReactElementTypeError(element, matcherFn, context);
  }
  // @ts-expect-error internal _fiber property of ReactTestInstance
  if (!element._fiber && !VALID_ELEMENTS.includes(element.type.toString())) {
    throw new ReactElementTypeError(element, matcherFn, context);
  }
}
exports.checkReactElement = checkReactElement;
function getType({ type }) {
  // @ts-expect-error: ReactTestInstance contains too loose typing
  return type.displayName || type.name || type;
}
exports.getType = getType;
function printElement(element) {
  if (element == null) {
    return 'null';
  }
  return (0, redent_1.default)(
    (0, pretty_format_1.default)(
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
exports.printElement = printElement;
function display(value) {
  return typeof value === 'string' ? value : (0, jest_matcher_utils_1.stringify)(value);
}
function getMessage(matcher, expectedLabel, expectedValue, receivedLabel, receivedValue) {
  return [
    `${matcher}\n`,
    `${expectedLabel}:\n${(0, jest_matcher_utils_1.EXPECTED_COLOR)(
      (0, redent_1.default)(display(expectedValue), 2),
    )}`,
    `${receivedLabel}:\n${(0, jest_matcher_utils_1.RECEIVED_COLOR)(
      (0, redent_1.default)(display(receivedValue), 2),
    )}`,
  ].join('\n');
}
exports.getMessage = getMessage;
function matches(textToMatch, matcher) {
  if (matcher instanceof RegExp) {
    return matcher.test(textToMatch);
  }
  return textToMatch.includes(matcher);
}
exports.matches = matches;
function normalize(text) {
  return text.replace(/\s+/g, ' ').trim();
}
exports.normalize = normalize;
function isEmpty(value) {
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
exports.isEmpty = isEmpty;
const warned = {};
function printDeprecationWarning(functionName, message) {
  if (warned[functionName]) {
    return;
  }
  // eslint-disable-next-line no-console
  console.warn(`Deprecation Warning:\n${message}`);
  warned[functionName] = true;
}
exports.printDeprecationWarning = printDeprecationWarning;
