import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      toBeDisabled(): R;
      toContainElement(element: ReactTestInstance | null): R;
      toBeEmptyElement(): R;
      toHaveProp(attr: string, value?: unknown): R;
      toHaveTextContent(text: string | RegExp, options?: { normalizeWhitespace: boolean }): R;
      toBeEnabled(): R;
      toHaveStyle(style: StyleProp<ViewStyle | TextStyle | ImageStyle>): R;

      /** @deprecated This function has been renamed to `toBeEmptyElement`. */
      toBeEmpty(): R;
      toBeVisible(): R;
    }
  }
}
