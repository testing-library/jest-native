/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Matchers } from '@jest/expect';
import type { JestNativeMatchers } from '../../../extend-expect';

interface ExpectExtendedWith<Parent, Target extends Parent> {}

// Checks if `jest.Matchers` interface is extended with `JestNativeMatchers`.
type IsJestImplicitExtended<R> = ExpectExtendedWith<JestNativeMatchers<R>, jest.Matchers<R>>;

// Checks if `Matchers` interface from `@jest/expecg` is extended with `JestNativeMatchers`.
type IsJestExplicitExtended<R extends void | Promise<void>> = ExpectExtendedWith<
  JestNativeMatchers<R>,
  Matchers<R>
>;
