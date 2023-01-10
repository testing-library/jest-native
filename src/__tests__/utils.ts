import { View, Text, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { checkReactElement, isEmpty } from '../utils';

describe('checkReactElement', () => {
  test('ReactTestInstance does not throw for host elements', () => {
    expect(() =>
      // @ts-expect-error Passing incorrect Jest Matcher data
      checkReactElement({ type: 'View' }, () => {}, {}),
    ).not.toThrow();
    expect(() =>
      // @ts-expect-error Passing incorrect Jest Matcher data
      checkReactElement({ type: 'TextInput' }, () => {}, {}),
    ).not.toThrow();
    expect(() =>
      // @ts-expect-error Passing incorrect Jest Matcher data
      checkReactElement({ type: 'View' }, () => {}, {}),
    ).not.toThrow();
  });

  test('ReactTestInstance does not throw for composite Text elements', () => {
    expect(() =>
      // @ts-expect-error Passing incorrect Jest Matcher data
      checkReactElement({ type: Text }, () => {}, {}),
    ).not.toThrow();
  });

  test('ReactTestInstance does not throw for composite TextInput elements', () => {
    expect(() =>
      // @ts-expect-error Passing incorrect Jest Matcher data
      checkReactElement({ type: TextInput }, () => {}, {}),
    ).not.toThrow();
  });

  test('it does throw for composite elements', () => {
    expect(() =>
      // @ts-expect-error Incorrect Test Renderer typings
      checkReactElement({ type: View }, () => {}, {}),
    ).toThrowErrorMatchingInlineSnapshot(`
      "expect(received).()

      received value must be a host element or composite Text/TextInput element
      Received has type:  object
      Received has value: {"type": [Function Component]}"
    `);
    expect(() =>
      // @ts-expect-error Incorrect Test Renderer typings
      checkReactElement({ type: Pressable }, () => {}, {}),
    ).toThrowErrorMatchingInlineSnapshot(`
      "expect(received).()

      received value must be a host element or composite Text/TextInput element
      Received has type:  object
      Received has value: {"type": {"$$typeof": Symbol(react.memo), "compare": null, "type": {"$$typeof": Symbol(react.forward_ref), "render": [Function Pressable]}}}"
    `);
    expect(() =>
      // @ts-expect-error Incorrect Test Renderer typings
      checkReactElement({ type: TouchableOpacity }, () => {}, {}),
    ).toThrowErrorMatchingInlineSnapshot(`
      "expect(received).()

      received value must be a host element or composite Text/TextInput element
      Received has type:  object
      Received has value: {"type": {"$$typeof": Symbol(react.forward_ref), "render": [Function anonymous]}}"
    `);
  });
});

test('isEmpty', () => {
  expect(isEmpty(null)).toEqual(true);
  expect(isEmpty(undefined)).toEqual(true);
  expect(isEmpty('')).toEqual(true);
  expect(isEmpty(' ')).toEqual(false);
  expect(isEmpty([])).toEqual(true);
  expect(isEmpty([[]])).toEqual(false);
  expect(isEmpty({})).toEqual(true);
  expect(isEmpty({ x: 0 })).toEqual(false);
  expect(isEmpty(0)).toEqual(true);
  expect(isEmpty(1)).toEqual(false);
  expect(isEmpty(NaN)).toEqual(true);
  expect(isEmpty([''])).toEqual(false);
});
