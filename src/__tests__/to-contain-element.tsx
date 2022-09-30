import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

const { queryByTestId } = render(
  <View testID="grandparent">
    <View testID="parent">
      <View testID="child" />
    </View>
    <Text testID="text-element" />
  </View>,
);

const grandparent = queryByTestId('grandparent');
const parent = queryByTestId('parent');
const child = queryByTestId('child');
const textElement = queryByTestId('text-element');
const nonExistantElement = queryByTestId('not-exists');
const fakeElement = undefined;

test('.toContainElement positive test cases', () => {
  expect(grandparent).toContainElement(parent);
  expect(grandparent).toContainElement(child);
  expect(grandparent).toContainElement(textElement);
  expect(parent).toContainElement(child);
  expect(parent).not.toContainElement(grandparent);
  expect(parent).not.toContainElement(textElement);
  expect(child).not.toContainElement(parent);
  expect(child).not.toContainElement(grandparent);
  expect(child).not.toContainElement(textElement);
  expect(grandparent).not.toContainElement(nonExistantElement);
  expect(child).not.toContainElement(nonExistantElement);
  expect(parent).not.toContainElement(nonExistantElement);
  expect(textElement).not.toContainElement(grandparent);
  expect(textElement).not.toContainElement(parent);
  expect(textElement).not.toContainElement(child);

  // obscure cases
  expect(() => expect(child).toContainElement(null)).toThrow();
  expect(() => expect(parent).toContainElement(null)).toThrow();
  expect(() => expect(grandparent).toContainElement(null)).toThrow();
});

test('.toContainElement negative test cases', () => {
  expect(() => expect(nonExistantElement).not.toContainElement(child)).toThrow();
  expect(() => expect(parent).toContainElement(grandparent)).toThrow();
  expect(() => expect(nonExistantElement).toContainElement(grandparent)).toThrow();
  expect(() => expect(grandparent).toContainElement(nonExistantElement)).toThrow();
  expect(() => expect(nonExistantElement).toContainElement(nonExistantElement)).toThrow();

  // @ts-expect-error intentionally passing incorrect type
  expect(() => expect(nonExistantElement).toContainElement(fakeElement)).toThrow();
  expect(() => expect(fakeElement).toContainElement(nonExistantElement)).toThrow();
  expect(() => expect(fakeElement).not.toContainElement(nonExistantElement)).toThrow();
  expect(() => expect(fakeElement).toContainElement(grandparent)).toThrow();

  // @ts-expect-error intentionally passing incorrect type
  expect(() => expect(grandparent).toContainElement(fakeElement)).toThrow();

  // @ts-expect-error intentionally passing incorrect type
  expect(() => expect(fakeElement).toContainElement(fakeElement)).toThrow();
  expect(() => expect(grandparent).not.toContainElement(child)).toThrow();
  expect(() => expect(grandparent).not.toContainElement(textElement)).toThrow();

  // @ts-expect-error intentionally passing incorrect type
  expect(() => expect(grandparent).not.toContainElement(undefined)).toThrow();
});
