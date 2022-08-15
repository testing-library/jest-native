import { checkReactElement, isEmpty, getStylePropAsRecord } from '../utils';

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

describe('getStylePropAsRecord', () => {
  test('basic', () => {
    expect(getStylePropAsRecord({ color: 'black' })).toEqual({
      color: 'black',
    });
  });

  test('basic merge', () => {
    expect(getStylePropAsRecord([{ color: 'black' }, { backgroundColor: 'red' }])).toEqual({
      color: 'black',
      backgroundColor: 'red',
    });
  });

  test('handles falsy', () => {
    expect(getStylePropAsRecord([{ color: 'black' }, false, { backgroundColor: 'red' }])).toEqual({
      color: 'black',
      backgroundColor: 'red',
    });
  });

  test('overwrite by order', () => {
    expect(getStylePropAsRecord([{ color: 'black' }, { color: 'red' }])).toEqual({
      color: 'red',
    });
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
