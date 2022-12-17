/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Matchers } from '@jest/expect';
import type { JestNativeMatchers } from '../../../extend-expect';

interface IsExtendedWithMatchers<R, T extends JestNativeMatchers<R>> {}

/*
this should not type check if something
is wrong with jest interfaces extension in `extend-expect.d.ts`
*/
type IsJestExplicitGlobalsExtended = IsExtendedWithMatchers<void, Matchers<void>>;
type IsJestImplicitGlobalsExtended = IsExtendedWithMatchers<void, jest.Matchers<void>>;
