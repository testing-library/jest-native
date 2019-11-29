import React from 'react';
import {
  Button,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native';
import { render } from '@testing-library/react-native';

test('.toBeDisabled', () => {
  const { queryByTestId, queryByText, queryByTitle, queryByDisplayValue } = render(
    <View disabled testID="view">
      <Button disabled testID="button" title="button" />
      <TextInput editable={false} testID="textInput" value="textInput" />
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

  expect(queryByTitle('button')).toBeDisabled();
  expect(() => expect(queryByTitle('button')).not.toBeDisabled()).toThrowError();

  expect(queryByTestId('textInput')).toBeDisabled();
  expect(queryByDisplayValue('textInput')).toBeDisabled();
  expect(() => expect(queryByTestId('textInput')).not.toBeDisabled()).toThrowError();
  expect(() => expect(queryByDisplayValue('textInput')).not.toBeDisabled()).toThrowError();

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
  const { queryByTestId, queryByText, queryByTitle, queryByDisplayValue } = render(
    <View testID="view">
      <Button title="button" />
      <TextInput testID="textInput" value="textInput" />
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

  expect(queryByTitle('button')).toBeEnabled();
  expect(() => expect(queryByTitle('button')).not.toBeEnabled()).toThrowError();

  expect(queryByTestId('textInput')).toBeEnabled();
  expect(queryByDisplayValue('textInput')).toBeEnabled();
  expect(() => expect(queryByTestId('textInput')).not.toBeEnabled()).toThrowError();
  expect(() => expect(queryByDisplayValue('textInput')).not.toBeEnabled()).toThrowError();

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

test('matcher misses', () => {
  const { queryByTestId, queryByTitle } = render(
    <View testID="view">
      <Button testID="enabled" title="enabled" />
      <Button disabled testID="disabled" title="disabled" />
    </View>,
  );

  expect(() => expect(queryByTestId('enabled')).toBeDisabled()).toThrowError();
  expect(() => expect(queryByTitle('disabled')).toBeEnabled()).toThrowError();
});
