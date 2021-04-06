import React from 'react';
import { Button, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

test('.toHaveProp', () => {
  const { queryByTestId } = render(
    <View>
      <Text allowFontScaling={false} testID="text">
        text
      </Text>
      <Button disabled testID="button" title="ok" />
    </View>,
  );

  expect(queryByTestId('text')).toHaveProp('allowFontScaling', false);
  expect(queryByTestId('text')).not.toHaveProp('style');

  expect(() =>
    expect(queryByTestId('button')).toHaveProp('accessibilityStates', ['disabled']),
  ).toThrowError();

  expect(() =>
    expect(queryByTestId('text')).not.toHaveProp('allowFontScaling', false),
  ).toThrowError();
  expect(() => expect(queryByTestId('text')).toHaveProp('style')).toThrowError();
  expect(() =>
    expect(queryByTestId('text')).toHaveProp('allowFontScaling', 'wrongValue'),
  ).toThrowError();
});
