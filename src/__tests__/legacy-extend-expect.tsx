import React from 'react';
import { View, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import '../legacy-extend-expect';

test('legacy expect.extend() works correctly', () => {
  render(
    <View testID="view">
      <Text>Hello</Text>
    </View>,
  );
  expect(screen.getByTestId('view')).legacy_toBeOnTheScreen();
  expect(screen.getByTestId('view')).legacy_toHaveTextContent('Hello');
  expect(screen.getByTestId('view')).legacy_toBeVisible();
  expect(screen.getByTestId('view')).legacy_toBeEnabled();
  expect(screen.getByTestId('view')).not.legacy_toBeDisabled();
});
