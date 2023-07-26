/// <reference types="jest" />
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
type Style = TextStyle | ViewStyle | ImageStyle;
export declare function toHaveStyle(
  this: jest.MatcherContext,
  element: ReactTestInstance,
  style: StyleProp<Style>,
): {
  pass: boolean;
  message: () => string;
};
export {};
