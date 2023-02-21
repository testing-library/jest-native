import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';

describe('.toHaveTextContent', () => {
  test('handles positive test cases', () => {
    const { queryByTestId } = render(<Text testID="count-value">2</Text>);

    expect(queryByTestId('count-value')).toHaveTextContent('2');
    expect(queryByTestId('count-value')).toHaveTextContent(/2/);
    expect(queryByTestId('count-value')).not.toHaveTextContent('21');
  });

  test('handles negative test cases', () => {
    const { queryByTestId } = render(<Text testID="count-value">2</Text>);

    expect(() => expect(queryByTestId('count-value2')).toHaveTextContent('2')).toThrow();

    expect(() => expect(queryByTestId('count-value')).toHaveTextContent('3')).toThrow();
    expect(() => expect(queryByTestId('count-value')).not.toHaveTextContent('2')).toThrow();
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
      <View testID="parent">
        <Text>One</Text>
        <Text>Two</Text>
        <View>
          <Text>Three</Text>
        </View>
        <View>
          <Text>Four</Text>
          {null}
          <Text>Five</Text>
          <View>
            <Text>Six</Text>
            <Text>Seven</Text>
          </View>
          <Text>Eight</Text>
        </View>
        Nine
      </View>,
    );

    expect(queryByTestId('parent')).toHaveTextContent('OneTwoThreeFourFiveSixSevenEightNine');
  });

  test('can handle multiple levels with no explicit children prop', () => {
    const NoChildren = ({ text }: { text: string }) => <Text>{text}</Text>;
    const answer = 'Answer';
    const { root } = render(
      <View>
        <Text>
          {answer}
          {': '}
        </Text>
        <NoChildren text="4" />
        {null}
        <Text>2</Text>
      </View>,
    );

    expect(root).toHaveTextContent(/^Answer: 42$/);
  });

  test('throws when no match is found', () => {
    const { root } = render(<Text>Should succeed</Text>);

    expect(() => {
      expect(root).toHaveTextContent('Should fail');
    }).toThrow();
  });

  test('does not throw error with empty content', () => {
    const { root } = render(<Text />);
    expect(root).toHaveTextContent('');
  });

  test('is case-sensitive', () => {
    const { root } = render(<Text>Sensitive text</Text>);

    expect(root).toHaveTextContent('Sensitive text');
    expect(root).not.toHaveTextContent('sensitive text');
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

  test('can handle text with an interpolated variable', () => {
    const variable = 'variable';
    const { root } = render(<Text>With a {variable}</Text>);

    expect(root).toHaveTextContent('With a variable');
  });
});
