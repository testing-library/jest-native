import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

test('.toBeEmptyElement', () => {
  const { queryByTestId } = render(
    <View testID="not-empty">
      <View testID="empty" />
    </View>,
  );

  const empty = queryByTestId('empty');
  const notEmpty = queryByTestId('not-empty');
  const nonExistantElement = queryByTestId('not-exists');
  const fakeElement = { thisIsNot: 'an html element' };

  expect(empty).toBeEmptyElement();
  expect(notEmpty).not.toBeEmptyElement();

  // negative test cases wrapped in throwError assertions for coverage.
  expect(() => expect(empty).not.toBeEmptyElement()).toThrow();

  expect(() => expect(notEmpty).toBeEmptyElement()).toThrow();

  expect(() => expect(fakeElement).toBeEmptyElement()).toThrow();

  expect(() => {
    expect(nonExistantElement).toBeEmptyElement();
  }).toThrow();
});
