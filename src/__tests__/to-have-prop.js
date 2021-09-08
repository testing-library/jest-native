import React from 'react';
import { Button, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('.toHaveProp', () => {
  const { queryByTestId } = render(
    <View accessibilityLabel={null} testID="view">
      <Text allowFontScaling={false} testID="text">
        text
      </Text>
      <Button disabled testID="button" title="ok" />
    </View>,
  );

  expect(queryByTestId('button')).toHaveProp('disabled', true);
  expect(queryByTestId('button')).toHaveProp('disabled');
  expect(queryByTestId('button')).toHaveProp('title', 'ok');

  expect(queryByTestId('text')).toHaveProp('allowFontScaling', false);
  expect(queryByTestId('text')).not.toHaveProp('style');

  expect(() =>
    expect(queryByTestId('button')).toHaveProp('accessibilityStates', ['disabled']),
  ).toThrowError();
  expect(() => expect(queryByTestId('button')).toHaveProp('accessible')).toThrowError();
  expect(() => expect(queryByTestId('button')).not.toHaveProp('disabled')).toThrowError();
  expect(() => expect(queryByTestId('button')).not.toHaveProp('title', 'ok')).toThrowError();

  expect(() =>
    expect(queryByTestId('text')).not.toHaveProp('allowFontScaling', false),
  ).toThrowError();
  expect(() => expect(queryByTestId('text')).toHaveProp('style')).toThrowError();
  expect(() =>
    expect(queryByTestId('text')).toHaveProp('allowFontScaling', 'wrongValue'),
  ).toThrowError();

  it('checks null values', () => {
    expect(queryByTestId('view')).toHaveProp('accessibilityLabel', null);
  });
});
