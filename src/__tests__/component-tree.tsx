import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { getParentElement } from '../component-tree';

function MultipleHostChildren() {
  return (
    <>
      <View testID="child1" />
      <View testID="child2" />
      <View testID="child3" />
    </>
  );
}

describe('getParentElement()', () => {
  it('returns host parent for host component', () => {
    const view = render(
      <View testID="grandparent">
        <View testID="parent">
          <View testID="subject" />
          <View testID="sibling" />
        </View>
      </View>,
    );

    const hostParent = getParentElement(view.getByTestId('subject'));
    expect(hostParent).toBe(view.getByTestId('parent'));

    const hostGrandparent = getParentElement(hostParent);
    expect(hostGrandparent).toBe(view.getByTestId('grandparent'));

    expect(getParentElement(hostGrandparent)).toBe(null);
  });

  it('returns host parent for null', () => {
    expect(getParentElement(null)).toBe(null);
  });

  it('returns host parent for composite component', () => {
    const view = render(
      <View testID="parent">
        <MultipleHostChildren />
        <View testID="subject" />
      </View>,
    );

    const compositeComponent = view.UNSAFE_getByType(MultipleHostChildren);
    const hostParent = getParentElement(compositeComponent);
    expect(hostParent).toBe(view.getByTestId('parent'));
  });
});
