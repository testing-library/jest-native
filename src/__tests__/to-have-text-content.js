import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('.toHaveTextContent', () => {
  test('handles positive test cases', () => {
    const { queryByTestId } = render(<Text testID="count-value">2</Text>);

    expect(queryByTestId('count-value')).toHaveTextContent('2');
    expect(queryByTestId('count-value')).toHaveTextContent(2);
    expect(queryByTestId('count-value')).toHaveTextContent(/2/);
    expect(queryByTestId('count-value')).not.toHaveTextContent('21');
  });

  test('handles negative test cases', () => {
    const { queryByTestId } = render(<Text testID="count-value">2</Text>);

    expect(() => expect(queryByTestId('count-value2')).toHaveTextContent('2')).toThrowError();

    expect(() => expect(queryByTestId('count-value')).toHaveTextContent('3')).toThrowError();
    expect(() => expect(queryByTestId('count-value')).not.toHaveTextContent('2')).toThrowError();
  });

  test('normalizes whitespace by default', () => {
    const { getByTestId } = render(
      <Text testID="text">
        {`
          Step
            1
              of
                4
          `}
        <Text />
      </Text>,
    );

    expect(getByTestId('text')).toHaveTextContent('Step 1 of 4');
  });

  test('can handle multiple levels', () => {
    const { queryByTestId } = render(
      <Text testID="parent">
        Step <Text>1</Text> of 4
      </Text>,
    );

    expect(queryByTestId('parent')).toHaveTextContent('Step 1 of 4');
  });

  test('can handle multiple levels with content spread across descendants', () => {
    const { queryByTestId } = render(
      <Text testID="parent">
        <Text>Step</Text>
        <Text> 1 </Text>
        <View>
          <Text> of </Text>
        </View>
        4
      </Text>,
    );

    expect(queryByTestId('parent')).toHaveTextContent('Step 1 of 4');
  });

  test('does not throw error with empty content', () => {
    const { container } = render(<Text />);
    expect(container).toHaveTextContent('');
  });

  test('is case-sensitive', () => {
    const { container } = render(<Text>Sensitive text</Text>);

    expect(container).toHaveTextContent('Sensitive text');
    expect(container).not.toHaveTextContent('sensitive text');
  });

  test('can handle conditional rendering', () => {
    const { getByTestId } = render(
      <Text testID="parent">
        <Text>Shown</Text>
        {false && <Text>false</Text>}
        {null && <Text>null</Text>}
        {undefined && <Text>undefined</Text>}
      </Text>,
    );

    expect(getByTestId('parent')).toHaveTextContent(/^Shown$/);
  });
});
