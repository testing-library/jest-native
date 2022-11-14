import { toBeDisabled, toBeEnabled } from './to-be-disabled';
import { toBeEmptyElement, toBeEmpty } from './to-be-empty-element';
import { toBeOnTheScreen } from './to-be-on-the-screen';
import { toContainElement } from './to-contain-element';
import { toHaveProp } from './to-have-prop';
import { toHaveStyle } from './to-have-style';
import { toHaveTextContent } from './to-have-text-content';
import { toBeVisible } from './to-be-visible';
import { toHaveAccessibilityState } from './to-have-accessibility-state';
import { toHaveAccessibilityValue } from './to-have-accessibility-value';

expect.extend({
  toBeDisabled,
  toBeEnabled,
  toBeEmptyElement,
  toBeEmpty, // Deprecated
  toBeOnTheScreen,
  toContainElement,
  toHaveProp,
  toHaveStyle,
  toHaveTextContent,
  toBeVisible,
  toHaveAccessibilityState,
  toHaveAccessibilityValue,
});
