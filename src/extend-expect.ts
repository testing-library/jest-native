import { toBeDisabled, toBeEnabled } from './to-be-disabled';
import { toBeEmptyElement, toBeEmpty } from './to-be-empty-element';
import { toHaveProp } from './to-have-prop';
import { toHaveTextContent } from './to-have-text-content';
import { toContainElement } from './to-contain-element';
import { toHaveStyle } from './to-have-style';

expect.extend({
  toBeDisabled,
  toContainElement,
  toBeEmptyElement,
  toBeEmpty, // Deprecated
  toHaveProp,
  toHaveTextContent,
  toBeEnabled,
  toHaveStyle,
});
