import type { ReactTestInstance } from 'react-test-renderer';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      toBeDisabled(): R;
      toContainElement(element: ReactTestInstance | null): R;
      toBeEmptyElement(): R;
      toHaveProp(attr: string, value?: any): R;
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
      toBeEnabled(): R;
      toHaveStyle(style: StyleProp<ViewStyle> | StyleProp<TextStyle>): R;

      /** @deprecated This function has been renamed to `toBeEmptyElement`. */
      toBeEmpty(): R;
    }
  }
}
