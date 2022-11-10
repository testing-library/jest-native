import * as React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';

test('.toHaveAccessibilityState to handle explicit state', () => {
  const { getByTestId } = render(
    <View>
      <View testID="disabled" accessibilityState={{ disabled: true }} />
      <View testID="selected" accessibilityState={{ selected: true }} />
      <View testID="busy" accessibilityState={{ busy: true }} />
      <View testID="checked-true" accessibilityState={{ checked: true }} />
      <View testID="checked-mixed" accessibilityState={{ checked: 'mixed' }} />
      <View testID="checked-false" accessibilityState={{ checked: false }} />
      <View testID="expanded-true" accessibilityState={{ expanded: true }} />
      <View testID="expanded-false" accessibilityState={{ expanded: false }} />

      <View testID="disabled-selected" accessibilityState={{ disabled: true, selected: true }} />
    </View>,
  );

  expect(getByTestId('disabled')).toHaveAccessibilityState({ disabled: true });
  expect(getByTestId('disabled')).not.toHaveAccessibilityState({ disabled: false });
  expect(() => expect(getByTestId('disabled')).toHaveAccessibilityState({ disabled: false }))
    .toThrowErrorMatchingInlineSnapshot(`
    "expect(element).toHaveAccessibilityState({"disabled": false})

    Expected the element to have accessibility state:
      {"disabled": false}
    Received element with implied accessibility state:
      {"busy": false, "disabled": true, "selected": false}"
  `);

  expect(getByTestId('selected')).toHaveAccessibilityState({ selected: true });
  expect(getByTestId('selected')).not.toHaveAccessibilityState({ selected: false });
  expect(() => expect(getByTestId('selected')).not.toHaveAccessibilityState({ selected: true }))
    .toThrowErrorMatchingInlineSnapshot(`
    "expect(element).not.toHaveAccessibilityState({"selected": true})

    Expected the element not to have accessibility state:
      {"selected": true}
    Received element with implied accessibility state:
      {"busy": false, "disabled": false, "selected": true}"
  `);

  expect(getByTestId('busy')).toHaveAccessibilityState({ busy: true });
  expect(getByTestId('busy')).not.toHaveAccessibilityState({ busy: false });

  expect(getByTestId('checked-true')).toHaveAccessibilityState({ checked: true });
  expect(getByTestId('checked-true')).not.toHaveAccessibilityState({ checked: 'mixed' });
  expect(getByTestId('checked-true')).not.toHaveAccessibilityState({ checked: false });

  expect(getByTestId('checked-mixed')).toHaveAccessibilityState({ checked: 'mixed' });
  expect(getByTestId('checked-mixed')).not.toHaveAccessibilityState({ checked: true });
  expect(getByTestId('checked-mixed')).not.toHaveAccessibilityState({ checked: false });

  expect(getByTestId('checked-false')).toHaveAccessibilityState({ checked: false });
  expect(getByTestId('checked-false')).not.toHaveAccessibilityState({ checked: true });
  expect(getByTestId('checked-false')).not.toHaveAccessibilityState({ checked: 'mixed' });

  expect(getByTestId('expanded-true')).toHaveAccessibilityState({ expanded: true });
  expect(getByTestId('expanded-true')).not.toHaveAccessibilityState({ expanded: false });

  expect(getByTestId('expanded-false')).toHaveAccessibilityState({ expanded: false });
  expect(getByTestId('expanded-false')).not.toHaveAccessibilityState({ expanded: true });

  expect(getByTestId('disabled-selected')).toHaveAccessibilityState({
    disabled: true,
    selected: true,
  });
  expect(getByTestId('disabled-selected')).not.toHaveAccessibilityState({
    disabled: false,
    selected: true,
  });
  expect(getByTestId('disabled-selected')).not.toHaveAccessibilityState({
    disabled: true,
    selected: false,
  });
});

test('.toHaveAccessibilityState to handle implicit state', () => {
  const { getByTestId } = render(<View testID="subject" />);

  expect(getByTestId('subject')).toHaveAccessibilityState({ disabled: false });
  expect(getByTestId('subject')).toHaveAccessibilityState({ selected: false });
  expect(getByTestId('subject')).toHaveAccessibilityState({ busy: false });

  expect(getByTestId('subject')).not.toHaveAccessibilityState({ checked: false });
  expect(getByTestId('subject')).not.toHaveAccessibilityState({ expanded: false });
});
