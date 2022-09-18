import { matcherHint } from 'jest-matcher-utils';
import { diff } from 'jest-diff';
import chalk from 'chalk';
import type { ReactTestInstance } from 'react-test-renderer';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { checkReactElement, display } from './utils';

type StyleRecord = {
  [P in keyof TextStyle | keyof ViewStyle]?: TextStyle[P];
};

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

function printoutStyles(styles: StyleRecord) {
  return getKeys(styles)
    .sort()
    .map((prop) => {
      const propertyKey = prop as keyof StyleRecord;
      return `${propertyKey}: ${display(styles[propertyKey])};`;
    })
    .join('\n');
}

/**
 * Recursively narrows down the properties in received to those with counterparts in expected
 */
function narrow(expected: StyleRecord, received: StyleRecord) {
  return getKeys(received)
    .filter((prop) => expected[prop])
    .reduce((obj, prop) => {
      const propertyKey = prop as keyof StyleRecord;

      if (Array.isArray(expected[prop]) && Array.isArray(received[prop])) {
        return Object.assign(obj, {
          // @ts-ignore not sure how to type it
          [prop]: expected[propertyKey]?.map((_, i) =>
            // @ts-ignore not sure how to type it
            narrow(expected[propertyKey][i], received[propertyKey][i]),
          ),
        });
      }

      return Object.assign(obj, {
        [prop]: received[prop],
      });
    }, {});
}

// Highlights only style rules that were expected but were not found in the
// received computed styles
function expectedDiff(expected: StyleRecord, received: StyleRecord) {
  const receivedNarrow = narrow(expected, received);

  const diffOutput = diff(printoutStyles(expected), printoutStyles(receivedNarrow));

  // TODO: What's this case?
  if (diffOutput == null) return '';
  // Remove the "+ Received" annotation because this is a one-way diff
  return diffOutput.replace(`${chalk.red('+ Received')}\n`, '');
}

export function toHaveStyle(
  this: jest.MatcherContext,
  element: ReactTestInstance,
  style: StyleProp<ViewStyle> | StyleProp<TextStyle>,
) {
  checkReactElement(element, toHaveStyle, this);

  const elementStyle = (element.props.style ?? {}) as StyleProp<ViewStyle> | StyleProp<TextStyle>;

  const expected = StyleSheet.flatten(style);
  const received = StyleSheet.flatten(elementStyle);

  return {
    pass: this.equals(received, expected),
    message: () => {
      const matcher = `${this.isNot ? '.not' : ''}.toHaveStyle`;
      return [matcherHint(matcher, 'element', ''), expectedDiff(expected, received)].join('\n\n');
    },
  };
}
