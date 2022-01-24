import React from 'react';
import { Modal, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('.toBeVisible', () => {
  test.each([
    ['Empty view', <View testID="test" />],
    ['View with opacity', <View testID="test" style={{ opacity: 0.2 }} />],
    ['Modal', <Modal testID="test" />],
    [
      'View within modal',
      <Modal>
        <View>
          <View testID="test" />
        </View>
      </Modal>,
    ],
  ])('handles positive test case: %s', (name, input) => {
    const { getByTestId } = render(input);
    expect(getByTestId('test')).toBeVisible();
  });

  test.each([
    ['View with 0 opacity', <View testID="test" style={{ opacity: 0 }} />],
    ["View with display 'none'", <View testID="test" style={{ display: 'none' }} />],
    [
      'Ancestor view with 0 opacity',
      <View style={{ opacity: 0 }}>
        <View>
          <View testID="test" />
        </View>
      </View>,
    ],
    [
      "Ancestor view with display 'none'",
      <View style={{ display: 'none' }}>
        <View>
          <View testID="test" />
        </View>
      </View>,
    ],
    [
      'View within not visible modal',
      <Modal visible={false}>
        <View>
          <View testID="test" />
        </View>
      </Modal>,
    ],
    ['Not visible modal', <Modal testID="test" visible={false} />],
  ])('handles negative test case: %s', (name, input) => {
    const { getByTestId } = render(input);
    expect(getByTestId('test')).not.toBeVisible();
  });

  it('handles non-React elements', () => {
    expect(() => expect({ name: 'Non-React element' }).not.toBeVisible()).toThrowError();
    expect(() => expect(true).not.toBeVisible()).toThrowError();
  });
});
