import * as React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

test('.toHaveAccessibilityValue to handle min, max, now', () => {
  const { getByTestId } = render(
    <View>
      <View testID="min" accessibilityValue={{ min: 1 }} />
      <View testID="max" accessibilityValue={{ max: 10 }} />
      <View testID="now" accessibilityValue={{ now: 5 }} />
      <View testID="min-max" accessibilityValue={{ min: 2, max: 5 }} />
      <View testID="min-now" accessibilityValue={{ min: 2, now: 3 }} />
      <View testID="max-now" accessibilityValue={{ max: 5, now: 4 }} />
      <View testID="min-max-now" accessibilityValue={{ min: 2, max: 5, now: 3 }} />
    </View>,
  );

  expect(getByTestId('min')).toHaveAccessibilityValue({ min: 1 });
  expect(getByTestId('min')).not.toHaveAccessibilityValue({ min: 2 });
  expect(() => expect(getByTestId('min')).toHaveAccessibilityValue({ min: 2 }))
    .toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toHaveAccessibilityValue({"min": 2})

    Expected the element to have accessibility value:
      {"min": 2}
    Received element with accessibility value:
      {"min": 1}"
  `);

  expect(getByTestId('max')).toHaveAccessibilityValue({ max: 10 });
  expect(getByTestId('max')).not.toHaveAccessibilityValue({ max: 5 });
  expect(() => expect(getByTestId('max')).toHaveAccessibilityValue({ max: 5 }))
    .toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toHaveAccessibilityValue({"max": 5})

    Expected the element to have accessibility value:
      {"max": 5}
    Received element with accessibility value:
      {"max": 10}"
  `);

  expect(getByTestId('now')).toHaveAccessibilityValue({ now: 5 });
  expect(getByTestId('now')).not.toHaveAccessibilityValue({ now: 3 });
  expect(() => expect(getByTestId('now')).toHaveAccessibilityValue({ now: 3 }))
    .toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toHaveAccessibilityValue({"now": 3})

    Expected the element to have accessibility value:
      {"now": 3}
    Received element with accessibility value:
      {"now": 5}"
  `);

  expect(getByTestId('min-max')).toHaveAccessibilityValue({ min: 2, max: 5 });
  expect(getByTestId('min-max')).not.toHaveAccessibilityValue({ min: 3, max: 5 });
  expect(getByTestId('min-max')).not.toHaveAccessibilityValue({ min: 2, max: 4 });
  expect(getByTestId('min-max')).not.toHaveAccessibilityValue({ min: 3, max: 4 });

  expect(getByTestId('min-now')).toHaveAccessibilityValue({ min: 2, now: 3 });
  expect(getByTestId('min-now')).not.toHaveAccessibilityValue({ min: 1, now: 3 });
  expect(getByTestId('min-now')).not.toHaveAccessibilityValue({ min: 2, now: 4 });
  expect(getByTestId('min-now')).not.toHaveAccessibilityValue({ min: 0, now: 4 });

  expect(getByTestId('max-now')).toHaveAccessibilityValue({ max: 5, now: 4 });
  expect(getByTestId('max-now')).not.toHaveAccessibilityValue({ max: 6, now: 4 });
  expect(getByTestId('max-now')).not.toHaveAccessibilityValue({ max: 5, now: 3 });
  expect(getByTestId('max-now')).not.toHaveAccessibilityValue({ max: 6, now: 3 });

  expect(getByTestId('min-max-now')).toHaveAccessibilityValue({ min: 2, max: 5, now: 3 });
  expect(getByTestId('min-max-now')).not.toHaveAccessibilityValue({ min: 1, max: 5, now: 3 });
  expect(getByTestId('min-max-now')).not.toHaveAccessibilityValue({ min: 2, max: 6, now: 3 });
  expect(getByTestId('min-max-now')).not.toHaveAccessibilityValue({ min: 2, max: 5, now: 4 });
});

test('.toHaveAccessibilityValue to handle string text', () => {
  const { getByTestId } = render(
    <View>
      <View testID="text" accessibilityValue={{ text: 'Hello world!' }} />
      <View testID="text-now" accessibilityValue={{ text: 'Hello world!', now: 5 }} />
    </View>,
  );

  expect(getByTestId('text')).toHaveAccessibilityValue({ text: 'Hello world!' });
  expect(getByTestId('text')).not.toHaveAccessibilityValue({ text: 'Hello other!' });
  expect(() => expect(getByTestId('text')).toHaveAccessibilityValue({ text: 'Hello other!' }))
    .toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toHaveAccessibilityValue({"text": "Hello other!"})

    Expected the element to have accessibility value:
      {"text": "Hello other!"}
    Received element with accessibility value:
      {"text": "Hello world!"}"
  `);
});

test('.toHaveAccessibilityValue to handle regex text', () => {
  const { getByTestId } = render(
    <View>
      <View testID="text" accessibilityValue={{ text: 'Hello world!' }} />
      <View testID="text-now" accessibilityValue={{ text: 'Hello world!', now: 5 }} />
    </View>,
  );

  expect(getByTestId('text')).toHaveAccessibilityValue({ text: /hello/i });
  expect(getByTestId('text')).not.toHaveAccessibilityValue({ text: /other/i });
  expect(() => expect(getByTestId('text')).toHaveAccessibilityValue({ text: /other/i }))
    .toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toHaveAccessibilityValue({"text": /other/i})

    Expected the element to have accessibility value:
      {"text": /other/i}
    Received element with accessibility value:
      {"text": "Hello world!"}"
  `);

  expect(getByTestId('text-now')).toHaveAccessibilityValue({ text: /hello/i, now: 5 });
  expect(getByTestId('text-now')).not.toHaveAccessibilityValue({ text: /hello/i, now: 3 });
  expect(getByTestId('text-now')).not.toHaveAccessibilityValue({ text: /other/i, now: 5 });
  expect(() => expect(getByTestId('text-now')).toHaveAccessibilityValue({ text: /hello/i, now: 3 }))
    .toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toHaveAccessibilityValue({"now": 3, "text": /hello/i})

    Expected the element to have accessibility value:
      {"now": 3, "text": /hello/i}
    Received element with accessibility value:
      {"now": 5, "text": "Hello world!"}"
  `);
  expect(() => expect(getByTestId('text-now')).toHaveAccessibilityValue({ text: /other/i, now: 5 }))
    .toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toHaveAccessibilityValue({"now": 5, "text": /other/i})

    Expected the element to have accessibility value:
      {"now": 5, "text": /other/i}
    Received element with accessibility value:
      {"now": 5, "text": "Hello world!"}"
  `);
});
