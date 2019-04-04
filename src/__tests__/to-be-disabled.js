import React from 'react';
import {
  Button,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { render } from 'native-testing-library';

test('.toBeDisabled', () => {
  const { queryByTestId, queryByText } = render(
    <View disabled testID="view">
      <Button disabled testID="button" title="button" />
      <TouchableHighlight disabled testID="highlight">
        <Text>highlight</Text>
      </TouchableHighlight>
      <TouchableOpacity disabled testID="opacity">
        <Text>opacity</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback disabled testID="without">
        <Text>without</Text>
      </TouchableWithoutFeedback>
    </View>,
  );

  expect(queryByTestId('view')).toBeDisabled();
  expect(() => expect(queryByTestId('view')).not.toBeDisabled()).toThrowError();

  expect(queryByTestId('button')).toBeDisabled();
  expect(queryByText('button')).toBeDisabled();
  expect(() => expect(queryByTestId('button')).not.toBeDisabled()).toThrowError();
  expect(() => expect(queryByText('button')).not.toBeDisabled()).toThrowError();

  expect(queryByTestId('highlight')).toBeDisabled();
  expect(queryByText('highlight')).toBeDisabled();
  expect(() => expect(queryByTestId('highlight')).not.toBeDisabled()).toThrowError();
  expect(() => expect(queryByText('highlight')).not.toBeDisabled()).toThrowError();

  expect(queryByTestId('opacity')).toBeDisabled();
  expect(queryByText('opacity')).toBeDisabled();
  expect(() => expect(queryByTestId('opacity')).not.toBeDisabled()).toThrowError();
  expect(() => expect(queryByText('opacity')).not.toBeDisabled()).toThrowError();

  expect(queryByTestId('without')).toBeDisabled();
  expect(queryByText('without')).toBeDisabled();
  expect(() => expect(queryByTestId('without')).not.toBeDisabled()).toThrowError();
  expect(() => expect(queryByText('without')).not.toBeDisabled()).toThrowError();
});

test('.toBeEnabled', () => {
  const { queryByTestId, queryByText } = render(
    <View testID="view">
      <Button testID="button" title="button" />
      <TouchableHighlight testID="highlight">
        <Text>highlight</Text>
      </TouchableHighlight>
      <TouchableOpacity testID="opacity">
        <Text>opacity</Text>
      </TouchableOpacity>
      <TouchableWithoutFeedback testID="without">
        <Text>without</Text>
      </TouchableWithoutFeedback>
    </View>,
  );

  expect(queryByTestId('view')).toBeEnabled();
  expect(() => expect(queryByTestId('view')).not.toBeEnabled()).toThrowError();

  expect(queryByTestId('button')).toBeEnabled();
  expect(queryByText('button')).toBeEnabled();
  expect(() => expect(queryByTestId('button')).not.toBeEnabled()).toThrowError();
  expect(() => expect(queryByText('button')).not.toBeEnabled()).toThrowError();

  expect(queryByTestId('highlight')).toBeEnabled();
  expect(queryByText('highlight')).toBeEnabled();
  expect(() => expect(queryByTestId('highlight')).not.toBeEnabled()).toThrowError();
  expect(() => expect(queryByText('highlight')).not.toBeEnabled()).toThrowError();

  expect(queryByTestId('opacity')).toBeEnabled();
  expect(queryByText('opacity')).toBeEnabled();
  expect(() => expect(queryByTestId('opacity')).not.toBeEnabled()).toThrowError();
  expect(() => expect(queryByText('opacity')).not.toBeEnabled()).toThrowError();

  expect(queryByTestId('without')).toBeEnabled();
  expect(queryByText('without')).toBeEnabled();
  expect(() => expect(queryByTestId('without')).not.toBeEnabled()).toThrowError();
  expect(() => expect(queryByText('without')).not.toBeEnabled()).toThrowError();
});
