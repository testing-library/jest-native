<div align="center">
  <h1>jest-native</h1>
  
  <a href="https://www.joypixels.com/emoji/1f985">
    <img
      height="80"
      width="80"
      alt="goat"
      src="https://raw.githubusercontent.com/bcarroll22/jest-native/master/other/eagle.png"
    />
  </a>
    
  <p>Custom jest matchers to test the state of React Native.</p>
</div>

<hr />

[![Build Status](https://travis-ci.org/bcarroll22/jest-native.svg?branch=master)](https://travis-ci.org/bcarroll22/jest-native)
[![Code Coverage](https://img.shields.io/codecov/c/github/bcarroll22/jest-native.svg?style=flat-square)](https://codecov.io/github/bcarroll22/jest-native)
[![version](https://img.shields.io/npm/v/jest-native.svg?style=flat-square)](https://www.npmjs.com/package/jest-native)
[![downloads](https://img.shields.io/npm/dm/jest-native.svg?style=flat-square)](http://www.npmtrends.com/jest-native)
[![MIT License](https://img.shields.io/npm/l/jest-native.svg?style=flat-square)](https://github.com/bcarroll22/jest-native/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![Watch on GitHub](https://img.shields.io/github/watchers/bcarroll22/jest-native.svg?style=social)](https://github.com/bcarroll22/jest-native/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/bcarroll22/jest-native.svg?style=social)](https://github.com/bcarroll22/jest-native/stargazers)

## The problem

You want to use [jest](https://facebook.github.io/jest/) to write tests that assert various things
about the state of a React Native tree. As part of that goal, you want to avoid all the repetitive
patterns that arise in doing so like checking for a native element's props, its text content, its
styles, and more.

## This solution

The `jest-native` library provides a set of custom jest matchers that you can use to extend jest.
These will make your tests more declarative, clear to read and to maintain.

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and should be installed
as one of your project's `devDependencies`:

```
npm install --save-dev jest-native
```

## Usage

Import `jest-native/extend-expect` once (for instance in your [tests setup
file][https://facebook.github.io/jest/docs/en/configuration.html#setuptestframeworkscriptfile-string])
and you're good to go:

```javascript
import 'jest-native/extend-expect';
```

Alternatively, you can selectively import only the matchers you intend to use, and extend jest's
`expect` yourself:

```javascript
import { toBeEmpty, toHaveTextContent } from 'jest-native';

expect.extend({ toBeEmpty, toHaveTextContent });
```

## Todo list

- [x] toBeDisabled()
- [x] toBeEnabled()
- [x] toBeEmpty()
- [ ] toBeVisible() {?}
- [x] toContainElement(FiberNode)
- [x] toHaveProp(prop: string, value: any)
- [ ] toHaveStyle(any) {?}
- [x] toHaveTextContent(text: string | RegExp, options?: {normalizeWhitespace: boolean})
