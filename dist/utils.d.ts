/// <reference types="jest" />
import type { ReactTestInstance } from 'react-test-renderer';
declare class ReactElementTypeError extends Error {
  constructor(received: unknown, matcherFn: jest.CustomMatcher, context: jest.MatcherContext);
}
declare function checkReactElement(
  element: ReactTestInstance | null | undefined,
  matcherFn: jest.CustomMatcher,
  context: jest.MatcherContext,
): asserts element is ReactTestInstance;
declare function getType({ type }: ReactTestInstance): any;
declare function printElement(element: ReactTestInstance | null): string;
declare function getMessage(
  matcher: string,
  expectedLabel: string,
  expectedValue: string | RegExp,
  receivedLabel: string,
  receivedValue: string | null,
): string;
declare function matches(textToMatch: string, matcher: string | RegExp): boolean;
declare function normalize(text: string): string;
declare function isEmpty(value: unknown): boolean;
export declare function printDeprecationWarning(functionName: string, message: string): void;
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
