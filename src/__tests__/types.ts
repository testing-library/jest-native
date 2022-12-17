/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Matchers } from '@jest/expect';
import type { JestNativeMatchers } from '../../extend-expect';

interface IsExtendedWithMatchers<R, T extends JestNativeMatchers<R>> {}

type IsJestGlobalsExtended = IsExtendedWithMatchers<void, Matchers<void>>;
