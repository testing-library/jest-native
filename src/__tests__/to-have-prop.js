import React from 'react';
import { Button, Text, View } from 'react-native';
import { render } from 'native-testing-library';

test('.toHaveProp', () => {
  const { debug, queryByTestId } = render(
    <View>
      <Text allowFontScaling={false} testID="text">
        text
      </Text>
      <Button disabled testID="button" title="ok" />
    </View>,
  );

  expect(queryByTestId('button')).toHaveProp('accessibilityStates', ['disabled']);
  expect(queryByTestId('button')).toHaveProp('accessible');
  expect(queryByTestId('button')).not.toHaveProp('disabled');
  expect(queryByTestId('button')).not.toHaveProp('title', 'ok');

  expect(queryByTestId('text')).toHaveProp('allowFontScaling', false);
  expect(queryByTestId('text')).not.toHaveProp('style');

  expect(() =>
    expect(queryByTestId('button')).not.toHaveProp('accessibilityStates', ['disabled']),
  ).toThrowError();
  expect(() => expect(queryByTestId('button')).not.toHaveProp('accessible')).toThrowError();
  expect(() => expect(queryByTestId('button')).toHaveProp('disabled')).toThrowError();
  expect(() => expect(queryByTestId('button')).toHaveProp('title', 'ok')).toThrowError();

  expect(() =>
    expect(queryByTestId('text')).not.toHaveProp('allowFontScaling', false),
  ).toThrowError();
  expect(() => expect(queryByTestId('text')).toHaveProp('style')).toThrowError();
});
