import { toBeDisabled, toBeEnabled } from './to-be-disabled';
import { toBeEmptyElement } from './to-be-empty-element';
import { toBeOnTheScreen } from './to-be-on-the-screen';
import { toBeVisible } from './to-be-visible';
import { toContainElement } from './to-contain-element';
import { toHaveAccessibilityState } from './to-have-accessibility-state';
import { toHaveAccessibilityValue } from './to-have-accessibility-value';
import { toHaveProp } from './to-have-prop';
import { toHaveStyle } from './to-have-style';
import { toHaveTextContent } from './to-have-text-content';

expect.extend({
  legacy_toBeDisabled: toBeDisabled,
  legacy_toBeEnabled: toBeEnabled,
  legacy_toBeEmptyElement: toBeEmptyElement,
  legacy_toBeOnTheScreen: toBeOnTheScreen,
  legacy_toBeVisible: toBeVisible,
  legacy_toContainElement: toContainElement,
  legacy_toHaveAccessibilityState: toHaveAccessibilityState,
  legacy_toHaveAccessibilityValue: toHaveAccessibilityValue,
  legacy_toHaveProp: toHaveProp,
  legacy_toHaveStyle: toHaveStyle,
  legacy_toHaveTextContent: toHaveTextContent,
});
