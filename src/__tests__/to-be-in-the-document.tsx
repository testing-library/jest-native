import * as React from 'react';
import { View, Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

function ShowChildren({ show }: { show: boolean }) {
  return show ? (
    <View>
      <Text testID="text">Hello</Text>
    </View>
  ) : (
    <View />
  );
}

test('toBeInTheDocument() on attached element', () => {
  render(<View testID="test" />);
  const element = screen.getByTestId('test');
  expect(element).toBeInTheDocument();
  expect(() => expect(element).not.toBeInTheDocument()).toThrowErrorMatchingInlineSnapshot(`
    "expect(element).not.toBeInTheDocument()

    expected document not to contain element but found:
      <View
        testID="test"
      />"
  `);
});

test('toBeInTheDocument() on detached element', () => {
  render(<ShowChildren show />);
  const element = screen.getByTestId('text');

  screen.update(<ShowChildren show={false} />);
  expect(element).toBeTruthy();
  expect(element).not.toBeInTheDocument();
  expect(() => expect(element).toBeInTheDocument()).toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toBeInTheDocument()

    element could not be found in the document"
  `);
});

test('toBeInTheDocument() on null element', () => {
  expect(null).not.toBeInTheDocument();
  expect(() => expect(null).toBeInTheDocument()).toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toBeInTheDocument()

    element could not be found in the document"
  `);
});
