'use strict';
// This file checks whether explicit Jest `extend` from '@jest/expect' is correctly extended with Jest Matchers.
Object.defineProperty(exports, '__esModule', { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
const globals_1 = require('@jest/globals');
(0, globals_1.expect)(null).toBeDisabled();
(0, globals_1.expect)(null).toBeEmptyElement();
(0, globals_1.expect)(null).toBeEnabled();
(0, globals_1.expect)(null).toBeOnTheScreen();
(0, globals_1.expect)(null).toBeVisible();
(0, globals_1.expect)(null).toContainElement(null);
(0, globals_1.expect)(null).toHaveTextContent('');
(0, globals_1.expect)(null).toHaveProp('foo');
(0, globals_1.expect)(null).toHaveStyle({});
(0, globals_1.expect)(null).toHaveAccessibilityState({});
(0, globals_1.expect)(null).toHaveAccessibilityValue({});
