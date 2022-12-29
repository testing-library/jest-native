/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Matchers } from '@jest/expect';
import type { JestNativeMatchers } from '../../extend-expect';

interface ExpectTypeExtends<Target extends Parent, Parent> {}

// Checks if `jest.Matchers` interface extends `JestNativeMatchers`.
type TestJestImplicitExtendsJestNativeMatchers<R> = ExpectTypeExtends<
  jest.Matchers<R>,
  JestNativeMatchers<R>
>;

// Checks if `@jest/expect` `Matchers` interface extends `JestNativeMatchers`.
type TestJestExplicitExtendsJestNativeMatchers<R extends void | Promise<void>> = ExpectTypeExtends<
  Matchers<R>,
  JestNativeMatchers<R>
>;
