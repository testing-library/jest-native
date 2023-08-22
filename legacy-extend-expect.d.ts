import type { AccessibilityState, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import type { AccessibilityValueMatcher } from './src/to-have-accessibility-value';

export interface JestNativeMatchers<R> {
  legacy_toBeDisabled(): R;
  legacy_toBeEmptyElement(): R;
  legacy_toBeEnabled(): R;
  legacy_toBeOnTheScreen(): R;
  legacy_toBeVisible(): R;
  legacy_toContainElement(element: ReactTestInstance | null): R;
  legacy_toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
  legacy_toHaveProp(attr: string, value?: unknown): R;
  legacy_toHaveStyle(style: StyleProp<ViewStyle | TextStyle | ImageStyle>): R;
  legacy_toHaveAccessibilityState(state: AccessibilityState): R;
  legacy_toHaveAccessibilityValue(value: AccessibilityValueMatcher): R;
}

// Implicit Jest global `expect`.
declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T = {}> extends JestNativeMatchers<R> {}
  }
}

// Explicit `@jest/globals` `expect` matchers.
declare module '@jest/expect' {
  interface Matchers<R extends void | Promise<void>> extends JestNativeMatchers<R> {}
}
