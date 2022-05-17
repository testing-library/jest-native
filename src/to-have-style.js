import { matcherHint } from 'jest-matcher-utils';
import { diff } from 'jest-diff';
import chalk from 'chalk';
import { all, compose, flatten, mergeAll, toPairs } from 'ramda';

import { checkReactElement } from './utils';

function isSubset(expected, received) {
  return compose(
    all(([prop, value]) =>
      Array.isArray(value)
        ? isSubset(mergeAll(value), mergeAll(received[prop]))
        : received[prop] === value,
    ),
    toPairs,
  )(expected);
}

function mergeAllStyles(styles) {
  return compose(mergeAll, flatten)(styles);
}

function printoutStyles(styles) {
  return Object.keys(styles)
    .sort()
    .map(prop =>
      Array.isArray(styles[prop])
        ? `${prop}: ${JSON.stringify(styles[prop], null, 2)};`
        : `${prop}: ${styles[prop]};`,
    )
    .join('\n');
}

/**
 * Recursively narrows down the properties in received to those with counterparts in expected
 */
function narrow(expected, received) {
  return Object.keys(received)
    .filter(prop => expected[prop])
    .reduce(
      (obj, prop) =>
        Object.assign(obj, {
          [prop]:
            Array.isArray(expected[prop]) && Array.isArray(received[prop])
              ? expected[prop].map((_, i) => narrow(expected[prop][i], received[prop][i]))
              : received[prop],
        }),
      {},
    );
}

// Highlights only style rules that were expected but were not found in the
// received computed styles
function expectedDiff(expected, elementStyles) {
  const received = narrow(expected, elementStyles);

  const diffOutput = diff(printoutStyles(expected), printoutStyles(received));
  // Remove the "+ Received" annotation because this is a one-way diff
  return diffOutput.replace(`${chalk.red('+ Received')}\n`, '');
}

export function toHaveStyle(element, style) {
  checkReactElement(element, toHaveStyle, this);

  const elementStyle = element.props.style ?? {};

  const expected = Array.isArray(style) ? mergeAllStyles(style) : style;
  const received = Array.isArray(elementStyle) ? mergeAllStyles(elementStyle) : elementStyle;

  return {
    pass: isSubset(expected, received),
    message: () => {
      const matcher = `${this.isNot ? '.not' : ''}.toHaveStyle`;
      return [matcherHint(matcher, 'element', ''), expectedDiff(expected, received)].join('\n\n');
    },
  };
}
