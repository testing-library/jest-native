import { Modal, StyleSheet } from 'react-native';
import { matcherHint } from 'jest-matcher-utils';
import type { ReactTestInstance } from 'react-test-renderer';

import { checkReactElement, printElement } from './utils';
import { getParentElement } from './component-tree';

function isVisibleForStyles(element: ReactTestInstance) {
  const style = element.props.style || {};
  const { display, opacity } = StyleSheet.flatten(style);
  return display !== 'none' && opacity !== 0;
}

function isVisibleForAccessibility(element: ReactTestInstance) {
  return (
    !element.props.accessibilityElementsHidden &&
    element.props.importantForAccessibility !== 'no-hide-descendants'
  );
}

function isModalVisible(element: ReactTestInstance) {
  return element.type !== Modal || element.props.visible !== false;
}

function isElementVisible(element: ReactTestInstance | null): boolean {
  if (element == null) {
    return false;
  }

  let current: ReactTestInstance | null = element;
  while (current) {
    const isVisible =
      isVisibleForStyles(current) && isVisibleForAccessibility(current) && isModalVisible(current);
    if (!isVisible) {
      return false;
    }

    current = getParentElement(current, [Modal]);
  }

  return true;
}

export function toBeVisible(this: jest.MatcherContext, element: ReactTestInstance) {
  checkReactElement(element, toBeVisible, this);
  const isVisible = isElementVisible(element);
  return {
    pass: isVisible,
    message: () => {
      const is = isVisible ? 'is' : 'is not';
      return [
        matcherHint(`${this.isNot ? '.not' : ''}.toBeVisible`, 'element', ''),
        '',
        `Received element ${is} visible:`,
        printElement(element),
      ].join('\n');
    },
  };
}
