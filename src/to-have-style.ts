import { matcherHint } from 'jest-matcher-utils';
import { diff } from 'jest-diff';
import chalk from 'chalk';
import type { ReactTestInstance } from 'react-test-renderer';
import type { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { checkReactElement, display } from './utils';

type Styles = TextStyle | ViewStyle | ImageStyle;
type StyleParameter = StyleProp<Styles>;

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

function printoutStyles(styles: Styles) {
  return getKeys(styles)
    .sort()
    .map((prop) => `${prop}: ${display(styles[prop])};`)
    .join('\n');
}

/**
 * Recursively narrows down the properties in received to those with counterparts in expected
 */
function narrow(expected: Styles, received: Styles) {
  return getKeys(received)
    .filter((prop) => expected[prop])
    .reduce((obj, prop) => {
      if (Array.isArray(expected[prop]) && Array.isArray(received[prop])) {
        return Object.assign(obj, {
          // @ts-ignore not sure how to type it
          [prop]: expected[prop]?.map((_, i) =>
            // @ts-ignore not sure how to type it
            narrow(expected[prop][i], received[prop][i]),
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
function expectedDiff(expected: Styles, received: Styles) {
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
  style: StyleParameter,
) {
  checkReactElement(element, toHaveStyle, this);

  const elementStyle = (element.props.style ?? {}) as StyleParameter;

  const expected = StyleSheet.flatten(style);
  const received = StyleSheet.flatten(elementStyle);

  return {
    pass: Object.entries(expected).every(([prop, value]) =>
      this.equals(received?.[prop as keyof typeof received], value),
    ),
    message: () => {
      const matcher = `${this.isNot ? '.not' : ''}.toHaveStyle`;
      return [matcherHint(matcher, 'element', ''), expectedDiff(expected, received)].join('\n\n');
    },
  };
}
