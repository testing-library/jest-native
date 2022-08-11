import { matcherHint } from 'jest-matcher-utils';
import { checkReactElement, getType, printElement } from './utils';

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

function isElementDisabledByParent(parent) {
  return isElementDisabled(parent);
}

function isElementDisabled(element) {
  if (!DISABLE_TYPES.includes(getType(element))) return false;

  return (
    !!element?.props?.disabled ||
    !!element?.props?.accessibilityState?.disabled ||
    !!element?.props?.accessibilityStates?.includes('disabled')
  );
}

function isAncestorDisabled(element) {
  const parent = element.parent;

  return (
    Boolean(parent) && (isElementDisabledByParent(element, parent) || isAncestorDisabled(parent))
  );
}

export function toBeDisabled(element) {
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

export function toBeEnabled(element) {
  checkReactElement(element, toBeDisabled, this);

  const isEnabled = !isElementDisabled(element);

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
