import type { AccessibilityState, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import type { AccessibilityValueMatcher } from './src/to-have-accessibility-value';

export interface JestNativeMatchers<R> {
  toBeDisabled(): R;
  toBeEmptyElement(): R;
  toBeEnabled(): R;
  toBeOnTheScreen(): R;
  toBeVisible(): R;
  toContainElement(element: ReactTestInstance | null): R;
  toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
  toHaveProp(attr: string, value?: unknown): R;
  toHaveStyle(style: StyleProp<ViewStyle | TextStyle | ImageStyle>): R;
  toHaveAccessibilityState(state: AccessibilityState): R;
  toHaveAccessibilityValue(value: AccessibilityValueMatcher): R;

  /** @deprecated This function has been renamed to `toBeEmptyElement`. */
  toBeEmpty(): R;
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
