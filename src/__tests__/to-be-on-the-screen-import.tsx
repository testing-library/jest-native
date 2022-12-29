import * as React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

jest.mock('@testing-library/react-native', () => ({
  ...jest.requireActual('@testing-library/react-native'),
  screen: undefined,
}));

test('toBeOnTheScreen() on null element', () => {
  const screen = render(<View testID="test" />);

  const test = screen.getByTestId('test');
  expect(() => expect(test).toBeOnTheScreen()).toThrowErrorMatchingInlineSnapshot(`
    "Could not import \`screen\` object from @testing-library/react-native.

    Using toBeOnTheScreen() matcher requires @testing-library/react-native v10.1.0 or later to be added to your devDependencies."
  `);
});
