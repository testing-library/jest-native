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
  Button,
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
      const { queryByTestId } = render(<Component disabled testID={name} />);

      expect(queryByTestId(name)).toBeDisabled();
      expect(() => expect(queryByTestId(name)).not.toBeDisabled()).toThrowError();
    });
  });

  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled in accessibilityStates for element ${name}`, () => {
      const { queryByTestId } = render(
        <Component accessibilityStates={['disabled']} testID={name} />,
      );

      expect(queryByTestId(name)).toBeDisabled();
      expect(() => expect(queryByTestId(name)).not.toBeDisabled()).toThrowError();
    });
  });

  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled in accessibilityState for element ${name}`, () => {
      const { queryByTestId } = render(
        <Component accessibilityState={{ disabled: true }} testID={name} />,
      );

      expect(queryByTestId(name)).toBeDisabled();
      expect(() => expect(queryByTestId(name)).not.toBeDisabled()).toThrowError();
    });
  });
});

describe('.toBeEnabled', () => {
  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled prop for element ${name} when undefined`, () => {
      const { queryByTestId } = render(<Component testID={name} />);

      expect(queryByTestId(name)).toBeEnabled();
      expect(() => expect(queryByTestId(name)).not.toBeEnabled()).toThrowError();
    });
  });

  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled in accessibilityStates for element ${name} when not included`, () => {
      const { queryByTestId } = render(<Component accessibilityStates={[]} testID={name} />);

      expect(queryByTestId(name)).toBeEnabled();
      expect(() => expect(queryByTestId(name)).not.toBeEnabled()).toThrowError();
    });
  });

  Object.entries(ALLOWED_COMPONENTS).forEach(([name, Component]) => {
    test(`handle disabled in accessibilityState for element ${name} when false`, () => {
      const { queryByTestId } = render(
        <Component accessibilityState={{ disabled: false }} testID={name} />,
      );

      expect(queryByTestId(name)).toBeEnabled();
      expect(() => expect(queryByTestId(name)).not.toBeEnabled()).toThrowError();
    });
  });
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
