import { checkReactElement, isEmpty } from '../utils';

describe('checkReactElement', () => {
  test('it does not throw an error for valid native primitives', () => {
    expect(() => {
      // @ts-expect-error Argument of type '{ type: "text"; }' is not assignable to parameter of type 'ReactTestInstance'. Type '{ type: "text"; }' is missing the following properties from type 'ReactTestInstance': instance, props, parent, children, and 6 more.ts(2345)
      checkReactElement({ type: 'Text' }, () => {}, null);
    }).not.toThrow();
  });

  test('ReactTestInstance does not throw', () => {
    expect(() => {
      // @ts-expect-error Argument of type '{ _fiber: {}; }' is not assignable to parameter of type 'ReactTestInstance'. Object literal may only specify known properties, and '_fiber' does not exist in type 'ReactTestInstance'.ts(2345)
      checkReactElement({ _fiber: {} }, () => {}, null);
    }).not.toThrow();
  });

  test('it does throw an error for invalid native primitives', () => {
    expect(() => {
      // @ts-expect-error Argument of type '{ type: "button"; }' is not assignable to parameter of type 'ReactTestInstance'. Type '{ type: "button"; }' is missing the following properties from type 'ReactTestInstance': instance, props, parent, children, and 6 more.ts(2345)
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
