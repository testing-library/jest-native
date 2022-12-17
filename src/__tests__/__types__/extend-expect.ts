/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Matchers } from '@jest/expect';
import type { JestNativeMatchers } from '../../../extend-expect';

interface IsExtendedWithMatchers<T extends JestNativeMatchers<void>> {}

/*
this should not type check if something
is wrong with jest interfaces extension in `extend-expect.d.ts`
*/
type IsJestExplicitGlobalsExtended = IsExtendedWithMatchers<Matchers<void>>;
type IsJestImplicitGlobalsExtended = IsExtendedWithMatchers<jest.Matchers<void>>;
