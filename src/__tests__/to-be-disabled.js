import React from 'react';
import {
  Button,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  View,
  Pressable,
} from 'react-native';
import { render } from '@testing-library/react-native';

const TestComponent = () => {
  return (
    <TouchableOpacity disabled={false} testID="touchable">
      <Text>Trigger Test</Text>
    </TouchableOpacity>
  );
};

describe('.toBeDisabled', () => {
  test.each([
    ['Button', Button, { title: 'some button' }],
    ['TouchableOpacity', TouchableOpacity, {}],
    ['TouchableHighlight', TouchableHighlight, {}],
    ['TouchableWithoutFeedback', TouchableWithoutFeedback, {}],
    ['TouchableNativeFeedback', TouchableNativeFeedback, {}],
    ['Pressable', Pressable, {}],
  ])('handles disabled prop for %s', (_, Component, props) => {
    const { queryByTestId } = render(
      <Component disabled testID="touchable" {...props}>
        <View />
      </Component>,
    );

    expect(queryByTestId('touchable')).toBeDisabled();
  });

  it('is not fooled by non-native disabled prop', () => {
    const { getByTestId } = render(<TestComponent disabled={true} />);

    expect(getByTestId('touchable')).not.toBeDisabled();
  });

  it('returns false when the component does not implement onStartShouldSetResponder', () => {
    const { getByTestId } = render(<View testID="view" />);

    expect(getByTestId('view')).not.toBeDisabled();
  });
});
