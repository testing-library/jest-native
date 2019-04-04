import { checkReactElement } from '../utils';

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
