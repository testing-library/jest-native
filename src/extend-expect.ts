import { toBeDisabled, toBeEnabled } from './to-be-disabled';
import { toBeEmptyElement, toBeEmpty } from './to-be-empty-element';
import { toContainElement } from './to-contain-element';
import { toHaveProp } from './to-have-prop';
import { toHaveStyle } from './to-have-style';
import { toHaveTextContent } from './to-have-text-content';
import { toBeVisible } from './to-be-visible';

expect.extend({
  toBeDisabled,
  toBeEnabled,
  toBeEmptyElement,
  toBeEmpty, // Deprecated
  toContainElement,
  toHaveProp,
  toHaveStyle,
  toHaveTextContent,
  toBeVisible,
});
