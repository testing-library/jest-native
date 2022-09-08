import React from 'react';
import {
  Button,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import { render } from '@testing-library/react-native';

const ALLOWED_COMPONENTS = {
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  Pressable,
};

describe('.toBeDisabled', () => {
  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled prop for element ${name}`, () => {
      const { queryByTestId } = render(
        <Component disabled testID={name}>
          <TextInput />
        </Component>,
      );

      expect(queryByTestId(name)).toBeDisabled();
      expect(() => expect(queryByTestId(name)).not.toBeDisabled()).toThrow();
    });
  });

  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled in accessibilityState for element ${name}`, () => {
      const { queryByTestId } = render(
        <Component accessibilityState={{ disabled: true }} testID={name}>
          <TextInput />
        </Component>,
      );

      expect(queryByTestId(name)).toBeDisabled();
      expect(() => expect(queryByTestId(name)).not.toBeDisabled()).toThrow();
    });
  });
});

describe('.toBeEnabled', () => {
  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled prop for element ${name} when undefined`, () => {
      const { queryByTestId } = render(
        <Component testID={name}>
          <TextInput />
        </Component>,
      );

      expect(queryByTestId(name)).toBeEnabled();
      expect(() => expect(queryByTestId(name)).not.toBeEnabled()).toThrow();
    });
  });

  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled in accessibilityState for element ${name} when false`, () => {
      const { queryByTestId } = render(
        <Component accessibilityState={{ disabled: false }} testID={name}>
          <TextInput />
        </Component>,
      );

      expect(queryByTestId(name)).toBeEnabled();
      expect(() => expect(queryByTestId(name)).not.toBeEnabled()).toThrow();
    });
  });
});

describe('for .toBeEnabled/Disabled Button', () => {
  test('handles disabled prop for button', () => {
    const { queryByTestId } = render(
      <View testID="view">
        <Button testID="enabled" title="enabled" />
        <Button disabled testID="disabled" title="disabled" />
      </View>,
    );

    expect(queryByTestId('enabled')).toBeEnabled();
    expect(queryByTestId('disabled')).toBeDisabled();
  });

  test('handles button a11y state', () => {
    const { queryByTestId } = render(
      <View testID="view">
        <Button accessibilityState={{ disabled: false }} testID="enabled" title="enabled" />
        <Button accessibilityState={{ disabled: true }} testID="disabled" title="disabled" />
      </View>,
    );

    expect(queryByTestId('enabled')).toBeEnabled();
    expect(queryByTestId('disabled')).toBeDisabled();
  });

  test('Errors when matcher misses', () => {
    const { queryByTestId, queryByTitle } = render(
      <View testID="view">
        <Button testID="enabled" title="enabled" />
        <Button disabled testID="disabled" title="disabled" />
      </View>,
    );

    expect(() => expect(queryByTestId('enabled')).toBeDisabled()).toThrow();
    expect(() => expect(queryByTitle('disabled')).toBeEnabled()).toThrow();
  });
});
