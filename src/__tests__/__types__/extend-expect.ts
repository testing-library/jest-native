/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Matchers } from '@jest/expect';
import type { JestNativeMatchers } from '../../../extend-expect';

interface ExpectExtendedWith<Parent, Target extends Parent> {}

/*
this should not type check if something
is wrong with jest interfaces extension in `extend-expect.d.ts`
*/
type IsJestImplicitExtended<R> = ExpectExtendedWith<JestNativeMatchers<R>, jest.Matchers<R>>;
type IsJestExplicitExtended<R extends void | Promise<void>> = ExpectExtendedWith<
  JestNativeMatchers<R>,
  Matchers<R>
>;
