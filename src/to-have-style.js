import { matcherHint } from 'jest-matcher-utils';
import jestDiff from 'jest-diff';
import chalk from 'chalk';
import { all, compose, flatten, mergeAll, toPairs } from 'ramda';

import { checkReactElement } from './utils';

function isSubset(expected, received) {
  return compose(
    all(([prop, value]) => received[prop] === value),
    toPairs,
  )(expected);
}

function mergeAllStyles(styles) {
  return compose(mergeAll, flatten)(styles);
}

function printoutStyles(styles) {
  return Object.keys(styles)
    .sort()
    .map(prop => `${prop}: ${styles[prop]};`)
    .join('\n');
}

// Highlights only style rules that were expected but were not found in the
// received computed styles
function expectedDiff(expected, elementStyles) {
  const received = Object.keys(elementStyles)
    .filter(prop => expected[prop])
    .reduce((obj, prop) => Object.assign(obj, { [prop]: elementStyles[prop] }), {});

  const diffOutput = jestDiff(printoutStyles(expected), printoutStyles(received));
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
