import React from 'react';
import { Text } from 'react-native';
import { render } from 'native-testing-library';

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
    const { rootInstance } = render(
      <Text>
        {`
          Step
            1
              of
                4
          `}
          <Text />
      </Text>,
    );

    expect(rootInstance).toHaveTextContent('Step 1 of 4');
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
        <Text>
          <Text> of </Text>
        </Text>
        4
      </Text>,
    );

    expect(queryByTestId('parent')).toHaveTextContent('Step 1 of 4');
  });

  test('does not throw error with empty content', () => {
    const { rootInstance } = render(<Text />);
    expect(rootInstance).toHaveTextContent('');
  });

  test('is case-sensitive', () => {
    const { rootInstance } = render(<Text>Sensitive text</Text>);

    expect(rootInstance).toHaveTextContent('Sensitive text');
    expect(rootInstance).not.toHaveTextContent('sensitive text');
  });
});
