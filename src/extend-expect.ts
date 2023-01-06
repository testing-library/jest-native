import { toBeDisabled, toBeEnabled } from './to-be-disabled';
import { toBeEmptyElement, toBeEmpty } from './to-be-empty-element';
import { toBeOnTheScreen } from './to-be-on-the-screen';
import { toBeVisible } from './to-be-visible';
import { toContainElement } from './to-contain-element';
import { toHaveAccessibilityState } from './to-have-accessibility-state';
import { toHaveAccessibilityValue } from './to-have-accessibility-value';
import { toHaveProp } from './to-have-prop';
import { toHaveStyle } from './to-have-style';
import { toHaveTextContent } from './to-have-text-content';

expect.extend({
  toBeDisabled,
  toBeEnabled,
  toBeEmptyElement,
  toBeEmpty, // Deprecated
  toBeOnTheScreen,
  toBeVisible,
  toContainElement,
  toHaveAccessibilityState,
  toHaveAccessibilityValue,
  toHaveProp,
  toHaveStyle,
  toHaveTextContent,
});
