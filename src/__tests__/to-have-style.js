import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { render } from 'native-testing-library';

describe('.toHaveStyle', () => {
  test('handles positive test cases', () => {
    const styles = StyleSheet.create({ container: { color: 'white' } });
    const { getByTestId } = render(
      <View
        testID="container"
        style={[{ backgroundColor: 'blue', height: '100%' }, styles.container]}
      >
        <Text>Hello World</Text>
      </View>,
    );

    const container = getByTestId('container');

    expect(container).toHaveStyle({ backgroundColor: 'blue', height: '100%' });
    expect(container).toHaveStyle([{ backgroundColor: 'blue' }, { height: '100%' }]);
    expect(container).toHaveStyle({ backgroundColor: 'blue' });
    expect(container).toHaveStyle({ height: '100%' });
    expect(container).toHaveStyle({ color: 'white' });
  });

  test('handles negative test cases', () => {
    const { getByTestId } = render(
      <View testID="container" style={{ backgroundColor: 'blue', color: 'black', height: '100%' }}>
        <Text>Hello World</Text>
      </View>,
    );

    const container = getByTestId('container');

    expect(() => expect(container).toHaveStyle({ fontWeight: 'bold' })).toThrowError();
    expect(() => expect(container).not.toHaveStyle({ color: 'black' })).toThrowError();
  });
});
