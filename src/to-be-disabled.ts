import { matcherHint } from 'jest-matcher-utils';
import type { ReactTestInstance } from 'react-test-renderer';
import { checkReactElement, printElement } from './utils';

// Elements that support 'disabled'
const DISABLE_TYPES = [
  'Button',
  'Slider',
  'Switch',
  'Text',
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
  'View',
  'TextInput',
  'Pressable',
];

function isElementDisabled(element: ReactTestInstance | null | undefined) {
  if (!element) return false;
  if (!DISABLE_TYPES.includes(element.type.toString())) return false;

  return (
    !!element?.props?.disabled ||
    !!element?.props?.accessibilityState?.disabled ||
    !!element?.props?.accessibilityStates?.includes('disabled')
  );
}

function isAncestorDisabled(element: ReactTestInstance | null | undefined): boolean {
  if (element == null) return false;
  const parent = element.parent;

  return Boolean(parent) && (isElementDisabled(element) || isAncestorDisabled(parent));
}

export function toBeDisabled(
  this: jest.MatcherContext,
  element: ReactTestInstance | null | undefined,
) {
  checkReactElement(element, toBeDisabled, this);

  const isDisabled = isElementDisabled(element) || isAncestorDisabled(element);

  return {
    pass: isDisabled,
    message: () => {
      const is = isDisabled ? 'is' : 'is not';
      return [
        matcherHint(`${this.isNot ? '.not' : ''}.toBeDisabled`, 'element', ''),
        '',
        `Received element ${is} disabled:`,
        printElement(element),
      ].join('\n');
    },
  };
}

export function toBeEnabled(
  this: jest.MatcherContext,
  element: ReactTestInstance | null | undefined,
) {
  checkReactElement(element, toBeEnabled, this);

  const isEnabled = !(isElementDisabled(element) || isAncestorDisabled(element));

  return {
    pass: isEnabled,
    message: () => {
      const is = isEnabled ? 'is' : 'is not';
      return [
        matcherHint(`${this.isNot ? '.not' : ''}.toBeEnabled`, 'element', ''),
        '',
        `Received element ${is} enabled:`,
        printElement(element),
      ].join('\n');
    },
  };
}
