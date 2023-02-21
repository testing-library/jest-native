import React from 'react';
import { View, Pressable, Modal } from 'react-native';
import { render } from '@testing-library/react-native';

describe('.toBeVisible', () => {
  test('handles empty view', () => {
    const { getByTestId } = render(<View testID="test" />);
    expect(getByTestId('test')).toBeVisible();
  });

  test('handles view with opacity', () => {
    const { getByTestId } = render(<View testID="test" style={{ opacity: 0.2 }} />);
    expect(getByTestId('test')).toBeVisible();
  });

  test('handles view with 0 opacity', () => {
    const { getByTestId } = render(<View testID="test" style={{ opacity: 0 }} />);
    expect(getByTestId('test')).not.toBeVisible();
  });

  test('handles view with display "none"', () => {
    const { getByTestId } = render(<View testID="test" style={{ display: 'none' }} />);
    expect(getByTestId('test', { includeHiddenElements: true })).not.toBeVisible();
  });

  test('handles ancestor view with 0 opacity', () => {
    const { getByTestId } = render(
      <View style={{ opacity: 0 }}>
        <View>
          <View testID="test" />
        </View>
      </View>,
    );
    expect(getByTestId('test', { includeHiddenElements: true })).not.toBeVisible();
  });

  test('handles ancestor view with display "none"', () => {
    const { getByTestId } = render(
      <View style={{ display: 'none' }}>
        <View>
          <View testID="test" />
        </View>
      </View>,
    );
    expect(getByTestId('test', { includeHiddenElements: true })).not.toBeVisible();
  });

  test('handles empty modal', () => {
    const { getByTestId } = render(<Modal testID="test" />);
    expect(getByTestId('test')).toBeVisible();
  });

  test('handles view within modal', () => {
    const { getByTestId } = render(
      <Modal>
        <View>
          <View testID="view-within-modal" />
        </View>
      </Modal>,
    );
    expect(getByTestId('view-within-modal')).toBeVisible();
  });

  test('handles view within not visible modal', () => {
    const { getByTestId, queryByTestId } = render(
      <Modal testID="test" visible={false}>
        <View>
          <View testID="view-within-modal" />
        </View>
      </Modal>,
    );
    expect(getByTestId('test')).not.toBeVisible();
    // Children elements of not visible modals are not rendered.
    expect(() => expect(getByTestId('view-within-modal')).not.toBeVisible()).toThrow();
    expect(queryByTestId('view-within-modal')).toBeNull();
  });

  test('handles not visible modal', () => {
    const { getByTestId } = render(<Modal testID="test" visible={false} />);
    expect(getByTestId('test', { includeHiddenElements: true })).not.toBeVisible();
  });

  test('handles inaccessible view (iOS)', () => {
    const { getByTestId, update } = render(<View testID="test" accessibilityElementsHidden />);
    expect(getByTestId('test', { includeHiddenElements: true })).not.toBeVisible();

    update(<View testID="test" accessibilityElementsHidden={false} />);
    expect(getByTestId('test')).toBeVisible();
  });

  test('handles view within inaccessible view (iOS)', () => {
    const { getByTestId } = render(
      <View accessibilityElementsHidden>
        <View>
          <View testID="test" />
        </View>
      </View>,
    );
    expect(getByTestId('test', { includeHiddenElements: true })).not.toBeVisible();
  });

  test('handles inaccessible view (Android)', () => {
    const { getByTestId, update } = render(
      <View testID="test" importantForAccessibility="no-hide-descendants" />,
    );
    expect(getByTestId('test', { includeHiddenElements: true })).not.toBeVisible();

    update(<View testID="test" importantForAccessibility="auto" />);
    expect(getByTestId('test')).toBeVisible();
  });

  test('handles view within inaccessible view (Android)', () => {
    const { getByTestId } = render(
      <View importantForAccessibility="no-hide-descendants">
        <View>
          <View testID="test" />
        </View>
      </View>,
    );
    expect(getByTestId('test', { includeHiddenElements: true })).not.toBeVisible();
  });

  test('handles null elements', () => {
    expect(() => expect(null).toBeVisible()).toThrowErrorMatchingInlineSnapshot(`
      "expect(received).toBeVisible()

      received value must be a React Element.
      Received has value: null"
    `);
  });

  test('handles non-React elements', () => {
    expect(() => expect({ name: 'Non-React element' }).not.toBeVisible()).toThrow();
    expect(() => expect(true).not.toBeVisible()).toThrow();
  });

  test('throws an error when expectation is not matched', () => {
    const { getByTestId, update } = render(<View testID="test" />);
    expect(() => expect(getByTestId('test')).not.toBeVisible()).toThrowErrorMatchingSnapshot();

    update(<View testID="test" style={{ opacity: 0 }} />);
    expect(() => expect(getByTestId('test')).toBeVisible()).toThrowErrorMatchingSnapshot();
  });

  test('handles Pressable with function style prop', () => {
    const { getByTestId } = render(
      <Pressable testID="test" style={() => ({ backgroundColor: 'blue' })} />,
    );
    expect(getByTestId('test')).toBeVisible();
  });
});
