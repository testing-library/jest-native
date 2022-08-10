import { checkReactElement, isEmpty, mergeAll } from '../utils';

describe('checkReactElement', () => {
  test('it does not throw an error for valid native primitives', () => {
    expect(() => {
      checkReactElement({ type: 'Text' }, () => {});
    }).not.toThrow();
  });

  test('ReactTestInstance does not throw', () => {
    expect(() => {
      checkReactElement({ _fiber: {} }, () => {});
    }).not.toThrow();
  });

  test('it does throw an error for invalid native primitives', () => {
    expect(() => {
      checkReactElement({ type: 'Button' }, () => {});
    }).toThrow();
  });
});

test('mergeAll', () => {
  expect(mergeAll([{ foo: 1 }, { bar: 2 }, { baz: 3 }])).toEqual({ foo: 1, bar: 2, baz: 3 });
  expect(mergeAll([{ foo: 1 }, { foo: 2 }, { bar: 2 }])).toEqual({ foo: 2, bar: 2 });
  expect(mergeAll([null, { foo: 1 }, { foo: 2 }, { bar: 2 }])).toEqual({ foo: 2, bar: 2 });
  expect(mergeAll([{ foo: 1 }, { foo: 2 }, { bar: 2 }, undefined])).toEqual({ foo: 2, bar: 2 });
  expect(mergeAll([{ foo: 1 }, { foo: 2 }, null, { bar: 2 }])).toEqual({ foo: 2, bar: 2 });
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
  expect(isEmpty(NaN)).toEqual(true);
  expect(isEmpty([''])).toEqual(false);
});
