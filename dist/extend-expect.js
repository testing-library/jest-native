'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const to_be_disabled_1 = require('./to-be-disabled');
const to_be_empty_element_1 = require('./to-be-empty-element');
const to_be_on_the_screen_1 = require('./to-be-on-the-screen');
const to_be_visible_1 = require('./to-be-visible');
const to_contain_element_1 = require('./to-contain-element');
const to_have_accessibility_state_1 = require('./to-have-accessibility-state');
const to_have_accessibility_value_1 = require('./to-have-accessibility-value');
const to_have_prop_1 = require('./to-have-prop');
const to_have_style_1 = require('./to-have-style');
const to_have_text_content_1 = require('./to-have-text-content');
expect.extend({
  toBeDisabled: to_be_disabled_1.toBeDisabled,
  toBeEnabled: to_be_disabled_1.toBeEnabled,
  toBeEmptyElement: to_be_empty_element_1.toBeEmptyElement,
  toBeEmpty: to_be_empty_element_1.toBeEmpty,
  // Deprecated
  toBeOnTheScreen: to_be_on_the_screen_1.toBeOnTheScreen,
  toBeVisible: to_be_visible_1.toBeVisible,
  toContainElement: to_contain_element_1.toContainElement,
  toHaveAccessibilityState: to_have_accessibility_state_1.toHaveAccessibilityState,
  toHaveAccessibilityValue: to_have_accessibility_value_1.toHaveAccessibilityValue,
  toHaveProp: to_have_prop_1.toHaveProp,
  toHaveStyle: to_have_style_1.toHaveStyle,
  toHaveTextContent: to_have_text_content_1.toHaveTextContent,
});
