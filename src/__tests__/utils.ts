import { checkReactElement, isEmpty } from '../utils';

describe('checkReactElement', () => {
  test('it does not throw an error for valid native primitives', () => {
    expect(() => {
      // @ts-ignore how to type it?
      checkReactElement({ type: 'Text' }, () => {}, null);
    }).not.toThrow();
  });

  test('ReactTestInstance does not throw', () => {
    expect(() => {
      // @ts-ignore how to type it?
      checkReactElement({ _fiber: {} }, () => {}, null);
    }).not.toThrow();
  });

  test('it does throw an error for invalid native primitives', () => {
    expect(() => {
      // @ts-ignore how to type it?
      checkReactElement({ type: 'Button' }, () => {}, null);
    }).toThrow();
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
