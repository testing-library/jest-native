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

## Custom matchers

`jest-native` has only been tested to work with `native-testing-library`. Keep in mind that these
queries will only work on UI elements that bridge to native.

### `toBeDisabled`

```javascript
toBeDisabled();
```

Check whether or not an element is disabled from a user perspective.

This matcher will check if the element or its parent has a `disabled` prop, or if it has
`accessibilityStates={['disabled']}`.

### `toBeEnabled`

```javascript
toBeEnabled();
```

Check whether or not an element is enabled from a user perspective.

Works similarly to `expect().not.toBeDisabled()`.

### `toBeEmpty`

```javascript
toBeEmpty();
```

Check that the given element has no content.

### `toContainElement(element)`

```javascript
toContainElement();
```

Check if an element contains another element as a descendant. Again, will only work for native
elements.

### `toHaveProp(prop, value)`

```javascript
toHaveProp(prop, value);
```

Check that an element has a given prop. Only works for native elements, so this is similar to
checking for attributes in the DOM.

You can optionally check that the attribute has a specific expected value.

### `toHaveTextContent(text)`

```javascript
toHaveTextContent(text);
```

Check if an element has the supplied text.

This will perform a partial, case-sensitive match when a string match is provided. To perform a
case-insensitive match, you can use a `RegExp` with the `/i` modifier.

To enforce matching the complete text content, pass a `RegExp`.

## Todo list

- [ ] toBeVisible() {?}
- [ ] toHaveStyle(any) {?}

## Inspiration

This library was made to be a companion for
[native-testing-library](https://github.com/bcarroll22/native-testing-library).

It was inspired by [jest-dom](https://github.com/gnapse/jest-dom/), the companion library for
[dom-testing-library](https://github.com/kentcdodds/dom-testing-library/). We emulated as many of
those helpers as we could while keeping in mind the guiding principles.

## Other Solutions

None known [add the first one](http://makeapullrequest.com)!
