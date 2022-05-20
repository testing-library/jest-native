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
  expect(() => expect(child).toContainElement(null)).toThrowError();
  expect(() => expect(parent).toContainElement(null)).toThrowError();
  expect(() => expect(grandparent).toContainElement(null)).toThrowError();
});

test('.toContainElement negative test cases', () => {
  expect(() => expect(nonExistantElement).not.toContainElement(child)).toThrowError();
  expect(() => expect(parent).toContainElement(grandparent)).toThrowError();
  expect(() => expect(nonExistantElement).toContainElement(grandparent)).toThrowError();
  expect(() => expect(grandparent).toContainElement(nonExistantElement)).toThrowError();
  expect(() => expect(nonExistantElement).toContainElement(nonExistantElement)).toThrowError();
  expect(() => expect(nonExistantElement).toContainElement(fakeElement)).toThrowError();
  expect(() => expect(fakeElement).toContainElement(nonExistantElement)).toThrowError();
  expect(() => expect(fakeElement).not.toContainElement(nonExistantElement)).toThrowError();
  expect(() => expect(fakeElement).toContainElement(grandparent)).toThrowError();
  expect(() => expect(grandparent).toContainElement(fakeElement)).toThrowError();
  expect(() => expect(fakeElement).toContainElement(fakeElement)).toThrowError();
  expect(() => expect(grandparent).not.toContainElement(child)).toThrowError();
  expect(() => expect(grandparent).not.toContainElement(textElement)).toThrowError();
  expect(() => expect(grandparent).not.toContainElement(undefined)).toThrowError();
});
