import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

test('.toBeEmpty', () => {
  const { queryByTestId } = render(
    <View testID="not-empty">
      <View testID="empty" />
    </View>,
  );

  const empty = queryByTestId('empty');
  const notEmpty = queryByTestId('not-empty');
  const nonExistantElement = queryByTestId('not-exists');
  const fakeElement = { thisIsNot: 'an html element' };

  expect(empty).toBeEmpty();
  expect(notEmpty).not.toBeEmpty();

  // negative test cases wrapped in throwError assertions for coverage.
  expect(() => expect(empty).not.toBeEmpty()).toThrow();

  expect(() => expect(notEmpty).toBeEmpty()).toThrow();

  expect(() => expect(fakeElement).toBeEmpty()).toThrow();

  expect(() => {
    expect(nonExistantElement).toBeEmpty();
  }).toThrow();
});
