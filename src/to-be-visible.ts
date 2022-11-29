import { Modal, StyleSheet } from 'react-native';
import { matcherHint } from 'jest-matcher-utils';
import type { ReactTestInstance } from 'react-test-renderer';

import { checkReactElement, getType, printElement } from './utils';

function isStyleVisible(element: ReactTestInstance) {
  const style = element.props.style || {};
  const isStyleFunction = getType(element) === 'Pressable' && typeof style === 'function';
  const { display, opacity } = StyleSheet.flatten(
    isStyleFunction ? style({ pressed: false }) : style,
  );
  return display !== 'none' && opacity !== 0;
}

function isAttributeVisible(element: ReactTestInstance) {
  return element.type !== Modal || element.props.visible !== false;
}

function isVisibleForAccessibility(element: ReactTestInstance) {
  const visibleForiOSVoiceOver = !element.props.accessibilityElementsHidden;
  const visibleForAndroidTalkBack =
    element.props.importantForAccessibility !== 'no-hide-descendants';
  return visibleForiOSVoiceOver && visibleForAndroidTalkBack;
}

function isElementVisible(element: ReactTestInstance): boolean {
  return (
    isStyleVisible(element) &&
    isAttributeVisible(element) &&
    isVisibleForAccessibility(element) &&
    (!element.parent || isElementVisible(element.parent))
  );
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
