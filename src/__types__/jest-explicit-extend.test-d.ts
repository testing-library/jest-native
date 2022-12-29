// This file checks whether explicit Jest `extend` from '@jest/expect' is correctly extended with Jest Matchers.

// eslint-disable-next-line import/no-extraneous-dependencies
import { expect as jestExpect } from '@jest/globals';

jestExpect(null).toBeDisabled();
jestExpect(null).toBeEmptyElement();
jestExpect(null).toBeEnabled();
jestExpect(null).toBeOnTheScreen();
jestExpect(null).toBeVisible();
jestExpect(null).toContainElement(null);
jestExpect(null).toHaveTextContent('');
jestExpect(null).toHaveProp('foo');
jestExpect(null).toHaveStyle({});
jestExpect(null).toHaveAccessibilityState({});
jestExpect(null).toHaveAccessibilityValue({});
