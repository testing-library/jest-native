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
        //@ts-expect-error JSX element type 'Component' does not have any construct or call signatures.ts(2604)
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
        //@ts-expect-error JSX element type 'Component' does not have any construct or call signatures.ts(2604)
        <Component accessibilityState={{ disabled: true }} testID={name}>
          <TextInput />
        </Component>,
      );

      expect(queryByTestId(name)).toBeDisabled();
      expect(() => expect(queryByTestId(name)).not.toBeDisabled()).toThrow();
    });
  });

  test('handle editable prop for TextInput', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <View>
        <TextInput testID="disabled" placeholder="disabled" editable={false} />
        <TextInput testID="enabled-by-default" placeholder="enabled-by-default" />
        <TextInput testID="enabled" placeholder="enabled" editable />
      </View>,
    );

    // Check host TextInput
    expect(getByTestId('disabled')).toBeDisabled();
    expect(getByTestId('enabled-by-default')).not.toBeDisabled();
    expect(getByTestId('enabled')).not.toBeDisabled();

    // Check composite TextInput
    expect(getByPlaceholderText('disabled')).toBeDisabled();
    expect(getByPlaceholderText('enabled-by-default')).not.toBeDisabled();
    expect(getByPlaceholderText('enabled')).not.toBeDisabled();
  });
});

describe('.toBeEnabled', () => {
  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled prop for element ${name} when undefined`, () => {
      const { queryByTestId } = render(
        //@ts-expect-error JSX element type 'Component' does not have any construct or call signatures.ts(2604)
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
        //@ts-expect-error JSX element type 'Component' does not have any construct or call signatures.ts(2604)
        <Component accessibilityState={{ disabled: false }} testID={name}>
          <TextInput />
        </Component>,
      );

      expect(queryByTestId(name)).toBeEnabled();
      expect(() => expect(queryByTestId(name)).not.toBeEnabled()).toThrow();
    });
  });

  test('handle editable prop for TextInput', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <View>
        <TextInput testID="enabled-by-default" placeholder="enabled-by-default" />
        <TextInput testID="enabled" placeholder="enabled" editable />
        <TextInput testID="disabled" placeholder="disabled" editable={false} />
      </View>,
    );

    // Check host TextInput
    expect(getByTestId('enabled-by-default')).toBeEnabled();
    expect(getByTestId('enabled')).toBeEnabled();
    expect(getByTestId('disabled')).not.toBeEnabled();

    // Check composite TextInput
    expect(getByPlaceholderText('enabled-by-default')).toBeEnabled();
    expect(getByPlaceholderText('enabled')).toBeEnabled();
    expect(getByPlaceholderText('disabled')).not.toBeEnabled();
  });
});

describe('for .toBeEnabled/Disabled Button', () => {
  test('handles disabled prop for button', () => {
    const { queryByTestId } = render(
      <View>
        <Button testID="enabled" title="enabled" />
        <Button disabled testID="disabled" title="disabled" />
      </View>,
    );

    expect(queryByTestId('enabled')).toBeEnabled();
    expect(queryByTestId('disabled')).toBeDisabled();
  });

  test('handles button a11y state', () => {
    const { queryByTestId } = render(
      <View>
        <Button accessibilityState={{ disabled: false }} testID="enabled" title="enabled" />
        <Button accessibilityState={{ disabled: true }} testID="disabled" title="disabled" />
      </View>,
    );

    expect(queryByTestId('enabled')).toBeEnabled();
    expect(queryByTestId('disabled')).toBeDisabled();
  });

  test('Errors when matcher misses', () => {
    const { queryByTestId, queryByText } = render(
      <View>
        <Button testID="enabled" title="enabled" />
        <Button disabled testID="disabled" title="disabled" />
      </View>,
    );

    expect(() => expect(queryByTestId('enabled')).toBeDisabled()).toThrow();
    expect(() => expect(queryByText('disabled')).toBeEnabled()).toThrow();
  });
});
