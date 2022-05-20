import React from 'react';
import { Button, Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('.toHaveProp', () => {
  const { queryByTestId } = render(
    <View accessibilityLabel={null} testID="view">
      <Text allowFontScaling={false} testID="text" editable={false}>
        text
      </Text>
      <Button disabled testID="button" title="ok" />
    </View>,
  );

  expect(queryByTestId('button')).toHaveProp('accessibilityState', { disabled: true });
  expect(queryByTestId('text')).toHaveProp('editable', false);
  expect(queryByTestId('text')).toHaveProp('allowFontScaling', false);

  expect(queryByTestId('button')).not.toHaveProp('accessibilityStates');
  expect(queryByTestId('button')).not.toHaveProp('editable', false);
  expect(queryByTestId('button')).not.toHaveProp('allowFontScaling', false);
  expect(queryByTestId('text')).not.toHaveProp('style');

  // title is no longer findable as it is a React child
  expect(() => expect(queryByTestId('button')).toHaveProp('title', 'ok')).toThrowError();
  expect(() => expect(queryByTestId('button')).toHaveProp('disabled')).toThrowError();
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
